import React from 'react'
import axios from "axios";
import data from "../../data_geojson.json";
import { GeoJSON } from "react-leaflet";

const GeoJSONComponent = (props) => {
  const checkKlasifikasi = async (kecamatan, category = null) => {
    const {data:klasifikasi} = await axios.get(`http://localhost:3000/analisis/check/${kecamatan}`);
    return klasifikasi.response;
};
  const getJumlah = async (kecamatan) => {
    const {data:jumlah} = await axios.get(`http://localhost:3000/analisis/jumlah/${kecamatan}`);
    return jumlah.response;
  };

  const onEachContry = async (feature, layer) =>{
    layer.options.color = "black";
    layer.options.fillColor = "white";  
    layer.options.weight = 2; 
    layer.options.fillOpacity = 0.4;
    const contryName = feature.properties.KECAMATAN;
    const jumlah = await getJumlah(contryName);
    var klasifikasi = ''
    if(!props.category){
      klasifikasi = await checkKlasifikasi(contryName);
    }
    else{
      klasifikasi = await checkKlasifikasi(contryName,props.category);
    }
    if (klasifikasi === "Banyak"){
      layer.options.fillColor = '#3CFF33';
    }
    else if (klasifikasi === "Sedikit"){
      layer.options.fillColor = '#FF3333';
    }
    else{
      layer.options.fillColor = '#E3FF33';
    }
    layer.on(
      'click', async function (e) {
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