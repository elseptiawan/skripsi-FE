import React, {useRef} from 'react'
import { Marker, Popup, useMap } from "react-leaflet";

import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const Markers = (props) => {
    const map = useMap();
    const markerRef = useRef(null)

    const func = (marker) => {
      window.open(`https://www.google.com/maps?saddr=My+Location&daddr=${marker.latitude},${marker.longtitude}`);
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
            </Popup>
          </Marker>
        );
      })
    );
}

export default Markers