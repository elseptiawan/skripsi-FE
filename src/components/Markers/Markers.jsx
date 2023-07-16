import React, {useRef, useState} from 'react'
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import style from "./markers.module.css";
import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const Markers = (props) => {
    const map = useMap();
    const markerRef = useRef(null)
    const [position, setPosition] = useState(null)
    const [error, setError] = useState(null)
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
        setPosition(e.latlng)
        // props.myPosition(position)
        // map.flyTo(e.latlng, map.getZoom())
      },
    });

    const func = (marker) => {
      // console.log(position.lng);
      if (!position){
        setError("Website tidak dapat membaca lokasi anda, silahkan berikan izin untuk mengakses lokasi anda!");
      }
      else{
        window.open(`http://maps.google.com/maps?saddr=${position.lat},${position.lng}&daddr=${marker.latitude},${marker.longtitude}`);
        setError(null);
      }
    };

    return (
      props.data.map((marker, index) => {
        return (
          <Marker
            ref={markerRef}
            eventHandlers={{
              click: () => {
                // const mark = markerRef.current
                map.flyTo(
                  [
                    marker.latitude,
                    marker.longtitude
                  ],
                  map.getZoom(),
                  // mark.openPopup()
                );
                // props.myRouting(false);
              }
            }}
            key={index}
            position={[marker.latitude, marker.longtitude]}
            icon={customIcon}
          >
            <Popup>
            {marker.nama} <br/> {marker.alamat} <br/> 
            <button style={{ background: 'transparent', border: 'none', color: 'blue', cursor: 'pointer' }} 
            onClick={() => func(marker)}>
              Dapatkan Arah dengan Google Maps
            </button>
            {error && <div className={style.alert}>{error}</div>}
            </Popup>
          </Marker>
        );
      })
    );
}

export default Markers