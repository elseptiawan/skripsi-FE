import React, {useState} from 'react'
import { Marker, Popup, useMapEvents} from "react-leaflet";
import { Icon } from "leaflet";

const eventIcon = new Icon({
  iconUrl: require("../../icons/pin.png"),
  iconSize: [30, 30] // size of the icon
});

const LocationMarker = (props) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      mouseover() {
        map.locate()
      },
      drag() {
        map.locate()
      },
      zoom() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        // props.myPosition(position)
        // map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={eventIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

export default LocationMarker