import React, {useState} from 'react'
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const Markers = (props) => {
    const map = useMap();

    const func = (marker) => {
      props.myRouting(true);
      props.myLat(marker.latitude);
      props.myLng(marker.longtitude);
    };

    return (
      props.data.map((marker, index) => {
        return (
          <Marker
            eventHandlers={{
              click: () => {
                map.flyTo(
                  [
                    marker.latitude,
                    marker.longtitude
                  ],
                  13
                );
                props.myRouting(false);
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
              Dapatkan Arah
            </button>
            </Popup>
          </Marker>
        );
      })
    );
}

export default Markers