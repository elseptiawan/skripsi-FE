import style from "../Style/maps.module.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Markers from "../components/Markers/Markers";
import SearchMarker from "../components/SearchMarker/SearchMarker";


import { Icon } from "leaflet";

const eventIcon = new Icon({
  iconUrl: require("../icons/pin.png"),
  iconSize: [30, 30] // size of the icon
});

  export default function Maps() {
    const navigate = useNavigate();
    const [restorans, setRestorans] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [value, setValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [center, setCenter] = useState([-6.92161129558201, 107.60699406029568]);

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

    const onChangeSearch = event => {
        setValue(event.target.value);
        if (!event.target.value){
          setShowSearch(false);
        }
      };

    const onSearch = (item) => {
      setValue(item.nama);
      setDataSearch(item);
      setShowSearch(true);
    }

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
          // map.flyTo(e.latlng, map.getZoom())
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

    const checkIsLogin = async () => {
      try {
          const res = await axios.get("http://localhost:3000/users/token");
          console.log(res.status);
          if (res.status == 200){
              setIsLogin(true);
          }
          else{
              setIsLogin(false);
          }
        } catch (error) {
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
        <Markers data={restorans} />
        {showSearch ? <SearchMarker data={dataSearch}/> : null}
        <LocationMarker />
        {/* <MarkerSelected markerPosition={selectedPosition} /> */}
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
            <div className={style.form_search}>
              <input value={value} onChange={onChangeSearch} type="search" name="search" placeholder="&#xf002;  Cari Restoran"/>
            </div>
            <div className={style.dropdown}>
              {restorans.filter(item => {
                const searchTerm = value.toLocaleLowerCase();
                const nama_restoran = item.nama.toLocaleLowerCase();
                
                return searchTerm && nama_restoran.startsWith(searchTerm) && nama_restoran !== searchTerm;
              })
              .map((item) => (
                <div onClick={() => onSearch(item)} className={style.dropdown_row}>{item.nama}</div>
              ))}
            </div>
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