import React from 'react'
import axios from "axios";
import data from "../../data_geojson.json";
import { GeoJSON } from "react-leaflet";

const GeoJSONComponent = (props) => {
  const checkKlasifikasi = async (kecamatan, category = null) => {
    const {data:klasifikasi} = await axios.get(`/analisis/check/${kecamatan}/${category ? category : ""}`);
    return klasifikasi.response;
};
  const getJumlah = async (kecamatan) => {
    const {data:jumlah} = await axios.get(`/analisis/jumlah/${kecamatan}`);
    return jumlah.response;
  };

  const onEachContry = async (feature, layer) =>{
    layer.options.color = "black";  
    layer.options.weight = 2; 
    layer.options.fillOpacity = 0.4;
    const contryName = feature.properties.KECAMATAN;
    const jumlah = await getJumlah(contryName);
    var klasifikasi = ''
    klasifikasi = await checkKlasifikasi(contryName);
    if (klasifikasi === "Banyak"){
      layer.setStyle({
        fillColor: '#3CFF33',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#3CFF33';
      // layer.options.fillOpacity = 0.4;
    }
    else if (klasifikasi === "Sedikit"){
      layer.setStyle({
        fillColor: '#FF3333',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#FF3333';
      // layer.options.fillOpacity = 0.4;
    }
    else{
      layer.setStyle({
        fillColor: '#E3FF33',
        fillOpacity: 0.4,
      });
      // layer.options.fillColor = '#E3FF33';
      // layer.options.fillOpacity = 0.4;
    }
    layer.on(
      'click', function (e) {
        let popupContent = `
        <Popup>
            <table>
             <tr>
                <td style="width: 200px">Nama Kecamatan</td>
                <td>:</td>
                <td>${contryName}</td>
             </tr>
              <tr>
                <td>Jumlah Restoran & Rumah Makan</td>
                <td>:</td>
                <td>${jumlah}</td>
              </tr>
              <tr>
                <td>Klasifikasi</td>
                <td>:</td>
                <td>${klasifikasi}</td>
              </tr>
            </table>
        </Popup>
    `;
    layer.bindPopup(popupContent);
    });
    layer.on(
      'mouseover', function (e) {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.8,
        });
        let popupContent = `
        <Popup>
            <table>
             <tr>
                <td style="width: 200px">Nama Kecamatan</td>
                <td>:</td>
                <td>${contryName}</td>
             </tr>
              <tr>
                <td>Jumlah Restoran & Rumah Makan</td>
                <td>:</td>
                <td>${jumlah}</td>
              </tr>
              <tr>
                <td>Klasifikasi</td>
                <td>:</td>
                <td>${klasifikasi}</td>
              </tr>
            </table>
        </Popup>
    `;
    layer.bindPopup(popupContent);
    });
    layer.on(
      'mouseout', function (e) {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.4,
        });
    });
  }

  return (
    <GeoJSON 
    key='mygeojson' 
    data={data}
    onEachFeature={onEachContry}
    />
  )
}

export default GeoJSONComponent