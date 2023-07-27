import React, {useRef, useEffect, useState} from 'react'
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../Markers/markers.module.css";

import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const SearchMarker = ({data}) => {
	  const markerRef = useRef(null)
    const map = useMap();
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);

    const mapEvents = useMapEvents({
      click() {
        mapEvents.locate()
      },
      mouseover() {
        mapEvents.locate()
      },
      drag() {
        mapEvents.locate()
      },
      zoom() {
        mapEvents.locate()
      },
      locationfound(e) {
        setPosition(e.latlng);
      },
    });

    const func = (marker) => {
      if (!position){
        setError("Website tidak dapat membaca lokasi anda, silahkan berikan izin untuk mengakses lokasi anda!");
      }
      else{
        window.open(`http://maps.google.com/maps?saddr=${position.lat},${position.lng}&daddr=${marker.latitude},${marker.longtitude}`);
        setError(null);
      }
    };

    useEffect(() => {
        const marker = markerRef.current
        if (marker) {
            marker.openPopup()
        }
      }, []);
    
    map.flyTo([data.latitude, data.longtitude], map.getZoom());

    return (
        <Marker
            ref={markerRef}
            position={[data.latitude, data.longtitude]}
            icon={customIcon}
          >
            <Popup>
            {data.nama} <br/> {data.no_sertifikat} <br/> {data.alamat} <br/> 
            <button style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer' }} 
            onClick={() => func(data)}>
              Dapatkan Arah dengan Google Maps
            </button>
            {error && <div className={style.alert}>{error}</div>}
            </Popup>
          </Marker>
    )
}

export default SearchMarker