import React, {useRef, useState} from 'react'
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import style from "./markers.module.css";
import { Icon } from "leaflet";

const dataDummy = [
  {
    latitude: -6.914744,
    longtitude: 107.609810,
  },
  {
    latitude: -6.872253031274607,
    longtitude: 107.61252731251643,
  },
  {
    latitude: -6.874468590841262,
    longtitude: 107.62939304159144,
  },
  {
    latitude: -6.8803056886992975,
    longtitude: 107.60407299030832,
  },
  {
    latitude: -6.879879625589099,
    longtitude: 107.5959619908295,
  },
  {
    latitude: -6.882989877501619,
    longtitude: 107.6254877455461,
  },
];
const restaurantIcon = new Icon({
    iconUrl: require("../../icons/restaurant_6395517.png"),
    iconSize: [25, 25] // size of the icon
  });

const RMIcon = new Icon({
  iconUrl: require("../../icons/rumah_makan.png"),
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
      dataDummy.map((marker, index) => {
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
            icon={marker.kategori_id === 1 ? restaurantIcon : RMIcon}
          >
            <Popup>
            {marker.nama} <br/> {marker.no_sertifikat} <br/> {marker.alamat} <br/> 
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