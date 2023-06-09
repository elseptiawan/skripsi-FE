import React from 'react'
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const Markers = ({data}) => {
    const map = useMap();
    return (
      data.map((marker, index) => {
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
              }
            }}
            key={index}
            position={[marker.latitude, marker.longtitude]}
            icon={customIcon}
          >
            <Popup>
            {marker.nama} <br/> {marker.alamat}
            </Popup>
          </Marker>
        );
      })
    );
}

export default Markers