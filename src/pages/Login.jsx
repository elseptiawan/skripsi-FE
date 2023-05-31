import React from 'react'
import style from "../Style/login.module.css";
import logo from '../icons/logo-halal.png';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate('../dashboard');
  };
  return (
    <div className={style.flex_container}>

    <div className={style.left}>
        <div className={style.back_button}>
        <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Peta</a>
        </div>
        <div className={style.form_container}>
          <div className={style.form_login}>
            <h2>Login Admin</h2>
            <form>
            <label>Email</label><br/>
            <input className={style.login_input} type="email" placeholder="Masukkan Email" name="email" required/><br/>
            <label>Password</label><br/>
            <input className={style.login_input} type="password" placeholder="Masukkan Password" name="password" required/><br/>
            <button className={style.login_button} onClick={event => handleClick(event)}>
              Login
            </button>
            </form>
          </div>
        </div>
    </div>
  
    <div className={style.right}>
        <img src={logo}/>
    </div>
  
    </div>
  )
}

export default Login