import style from "../Style/maps.module.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";


import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

  export default function Maps() {
    const position = [-6.901681163172566, 107.62512693756112]
    const navigate = useNavigate();
    const handleClick = (event) => {
        navigate('login');
      };
    const [restorans, setRestorans] = useState([]);

    useEffect(() => {
      getRestorans();
    }, []);

    const getRestorans = async () => {
      const response = await axios.get("http://localhost:3000/restorans");
      setRestorans(response.data.data);
    };

    return (
      <div className={style.container}>
        <div className={style.map}>
        <MapContainer className={style.leaflet_container} center={[-6.92161129558201, 107.60699406029568]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restorans.map((restoran, index) => (
          <Marker key={index} position={[restoran.latitude, restoran.longtitude]} icon={customIcon}>
            <Popup>{restoran.nama} <br/> {restoran.alamat}</Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
        <div className={style.topleft}>
          <form>
            <select name = "category">
            <option>Semua Kategori</option>
            <option>Restoran</option>
            <option>Rumah Makan</option>
            <option>Catering</option>
            </select>
            <br/>
            <div className={style.form_search}>
              <input type="search" name="search" placeholder="&#xf002;  Cari Restoran"/>
            </div>
          </form>
        </div>
        <div className={style.topright}> 
        <button className={style.login} onClick={event => handleClick(event)}>
        Login <FontAwesomeIcon icon={faRightToBracket} />
        </button>
        </div>
      </div>
    );
  }