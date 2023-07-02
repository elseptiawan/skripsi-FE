import React, { useState, useEffect } from 'react';
import style from "../Style/dashboard.module.css";
import axios from "axios";
import ListRestoran from "../components/ListRestoran/ListRestoran";
import Kategori from "../components/Kategori/Kategori";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const navigate = useNavigate();
    const [restoran, setRestoran] = useState(true);
    const [kategori, setKategori] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkIsLogin();
        // if(!isLogin){
        //     navigate("/login");
        // }
      }, [isLogin]);

    const handleClick = async () => {
        try {
            setLocalStorage("token", "");
            axios.defaults.headers.common["Authorization"] = "";
            navigate("/login");
          } catch (error) {
            console.log(error);
          }
    };

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
    <div className={style.dashboard_container}>
        <div className={style.top}>
            <div className={style.maps_button}>
                <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Lihat Peta</a>
            </div>
            <div className={style.logout_button}>
                <button className={style.logout} onClick={event => handleClick(event)}>
                    Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>
        </div>
        <div className={style.main_container}>
            <div className={style.data_container}>
                <div className={style.navbar}>
                    <button className={style.nav_button} onClick={() => {setRestoran(true); setKategori(false)}}>
                        Restoran
                    </button>
                    <button className={style.nav_button} onClick={() => {setRestoran(false); setKategori(true)}}>
                        Kategori
                    </button>
                </div>
                {restoran ? <ListRestoran/> : null}
                {kategori ? <Kategori/> : null}
            </div>
        </div>
    </div>
  )
}

export default Dashboard