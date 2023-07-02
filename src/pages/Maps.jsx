import style from "../Style/maps.module.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/Map/Map";

  export default function Maps() {
    const navigate = useNavigate();
    const [restorans, setRestorans] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [batasAtas, setBatasAtas] = useState('');
    const [batasBawah, setBatasBawah] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [value, setValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const handleClickLogin = () => {
        navigate('login');
      };
    const handleClickDashboard = () => {
        navigate('dashboard');
      };
    const handleChange = event => {
        if (!event.target.value){
          setCategory('');
          getRestorans();
        }
        else{
          setCategory(event.target.value);
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
      getBatas();
    }, []);

    const getRestorans = async () => {
      const dataRestorans = await axios.get("/restorans");
      setRestorans(dataRestorans.data.data);
    };

    const getRestoransByCategory = async (id) => {
      const dataRestoransByCategory = await axios.get(`/restorans/get-by-category/${id}`);
      setRestorans(dataRestoransByCategory.data.data);
    };

    const getCategories = async () => {
      const dataCategories = await axios.get("/categories");
      setCategories(dataCategories.data.response);
    }

    const getBatas = async () => {
      const batas = await axios.get("/analisis");
      console.log(batas.data);
      setBatasAtas(batas.data.batas_atas);
      setBatasBawah(batas.data.batas_bawah);
    }

    const checkIsLogin = async () => {
      try {
          const res = await axios.get("/users/token");
          console.log(res.status);
          if (res.status === 200){
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
        <Map search={showSearch} data={restorans} dataSearch={dataSearch} category={category}/>
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
          {isLogin ? 
          <button className={style.login_icon} onClick={event => handleClickDashboard(event)}>
          <FontAwesomeIcon icon={faUser} />
          </button> : 
          <button className={style.login_icon} onClick={event => handleClickLogin(event)}>
          <FontAwesomeIcon icon={faRightToBracket} />
          </button>}
        </div>
        <div className={style.bottomleft}>
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#3CFF33"/></span>
          <span className={style.legend_value}>{`: Banyak (X > ${batasAtas})`}</span>
          </div> 
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#E3FF33"/></span>
          <span className={style.legend_value}>{`: Sedang (${batasBawah}`} &#8804; {`X`} &#8804; {`${batasAtas})`}</span>
          </div> 
          <div className={style.legend}>
          <span className={style.legend_key}><hr width="40px" size="10" color="#FF3333"/></span>
          <span className={style.legend_value}>{`: Sedikit (X < ${batasBawah})`}</span>
          </div> 
        </div>
      </div>
    );
  }