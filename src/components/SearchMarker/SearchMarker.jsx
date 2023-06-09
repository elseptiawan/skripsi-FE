import React, {useRef, useEffect} from 'react'
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const SearchMarker = ({data}, props) => {
	const markerRef = useRef(null)
    const map = useMap();

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
            {data.nama} <br/> {data.alamat}
            </Popup>
          </Marker>
    )
}

export default SearchMarker