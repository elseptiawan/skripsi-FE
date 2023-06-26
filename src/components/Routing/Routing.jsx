import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("../../icons/placeholder.png"),
  iconSize: [30, 30]
});

export default function Routing(props) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(props.currentPosition), L.latLng(props.latDestination, props.lngDestination)],
      collapsible: true,
      addWaypoints: false,
      showAlternatives: false,
      show: true,
    }).addTo(map);

    return () => map?.removeControl(routingControl);
  }, [map]);

  return null;
}
