import React from 'react'
import data from "../../data_geojson.json";
import { GeoJSON } from "react-leaflet";

const GeoJSONComponent = () => {
  const onEachContry = (feature, layer) =>{
    const contryName = feature.properties.KECAMATAN;   
    layer.on('mouseover', function (e) {
      layer.bindPopup(contryName).openPopup()
    });
  }
  return (
    <GeoJSON 
    key='mygeojson' 
    data={data}
    onEachFeature={onEachContry}/>
  )
}

export default GeoJSONComponent