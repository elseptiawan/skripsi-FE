import React from 'react'
import style from "./map.module.css";
import { MapContainer, TileLayer} from "react-leaflet";
import Markers from "../Markers/Markers";
import SearchMarker from "../SearchMarker/SearchMarker";
// import Routing from "../Routing/Routing";
import LocationMarker from "../LocationMarker/LocationMarker";
import GeoJsonComponent from "../GeoJsonComponent/GeoJsonComponent";

const Map = (props) => {
    // const [routing, setRouting] = useState(false);
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    // const [currentLocation, setCurrentLocation] = useState('');

    // const receivedRouting = (data) => {
    //     setRouting(data);
    //   };
    //   const receivedLat = (data) => {
    //     setLat(data);
    //   };
    //   const receivedLng = (data) => {
    //     setLng(data);
    //   };
    // const receivedPosition = (data) => {
    //     setCurrentLocation(data);
    //   };
    return (
        <div className={style.map}>
            <MapContainer 
            className={style.leaflet_container} 
            center={[-6.908775426573443, 107.64318087144039]} 
            zoom={13} 
            scrollWheelZoom={true} 
            zoomControl={false}
            // onClick={() => setRouting(false)}
            >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers data={props.data} 
            // myRouting={receivedRouting} myLat={receivedLat} myLng={receivedLng}
            />
            {props.search ? <SearchMarker data={props.dataSearch}/> : null}
            <LocationMarker 
            // myPosition={receivedPosition}
            />
            {/* {routing ? <Routing currentPosition={currentLocation} latDestination={lat} lngDestination={lng}/> : null} */}
            {/* <MarkerSelected markerPosition={selectedPosition} /> */}
            <GeoJsonComponent data={props.data} category={props.category}/>
        </MapContainer>
        </div>
    )
}

export default Map