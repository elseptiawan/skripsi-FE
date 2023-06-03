import style from "../Style/maps.module.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";


import { Icon } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

const eventIcon = new Icon({
  iconUrl: require("../icons/pin.png"),
  iconSize: [30, 30] // size of the icon
});

  export default function Maps() {
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('login');
      };
    const handleClickDashboard = () => {
        navigate('dashboard');
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
    const [isLogin, setIsLogin] = useState(false);
    const [center, setCenter] = useState([-6.92161129558201, 107.60699406029568]);
    const map = useMap();

    useEffect(() => {
      getRestorans();
      getCategories();
      checkIsLogin();
    }, []);

    function LocationMarker() {
      const [position, setPosition] = useState(null)
      const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })
    
      return position === null ? null : (
        <Marker position={position} icon={eventIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }

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

    const checkIsLogin = () => {
      const token = localStorage.getItem('token')
      if(token){
        setIsLogin(true);
      }
      else{
        setIsLogin(false);
      }
    }

    return (
      <div className={style.container}>
        <div className={style.map}>
        <MapContainer className={style.leaflet_container} center={center} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restorans.map((restoran, index) => (
          <Marker 
          key={index} 
          position={[restoran.latitude, restoran.longtitude]} 
          icon={customIcon}
          >
            <Popup>{restoran.nama} <br/> {restoran.alamat}</Popup>
          </Marker>
        ))}
        <LocationMarker />
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
        {isLogin ? 
        <button className={style.login} onClick={event => handleClickDashboard(event)}>
        Dashboard 
        </button> : 
        <button className={style.login} onClick={event => handleClickLogin(event)}>
        Login <FontAwesomeIcon icon={faRightToBracket} />
        </button>}
        </div>
      </div>
    );
  }