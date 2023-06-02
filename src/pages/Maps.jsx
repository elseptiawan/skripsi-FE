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
    const navigate = useNavigate();
    const handleClick = (event) => {
        navigate('login');
      };
    const handleChange = event => {
        if (!event.target.value){
          getRestorans();
        }
        else{
          getRestoransByCategory(event.target.value);
        }
      };
    const [restorans, setRestorans] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getRestorans();
    }, []);

    useEffect(() => {
      getCategories();
    }, []);

    const getRestorans = async () => {
      const dataRestorans = await axios.get("http://localhost:3000/restorans");
      setRestorans(dataRestorans.data.data);
    };

    const getRestoransByCategory = async (id) => {
      const dataRestoransByCategory = await axios.get(`http://localhost:3000/restorans/get-by-category/${id}`);
      setRestorans(dataRestoransByCategory.data.data);
    };

    const getCategories = async () => {
      const dataCategories = await axios.get("http://localhost:3000/categories");
      setCategories(dataCategories.data.response);
    }

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
            <select name = "category" onChange={handleChange}>
            <option value=''>Semua Kategori</option>
            {categories.map((category, index) => (
              <option key={index} value={category.kategori_id}>{category.nama}</option>
            ))}
            </select>
            <br/>
            <form>
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