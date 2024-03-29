import React, { useState, useEffect } from 'react'
import axios from "axios";
import style from "../Style/login.module.css";
import logo from '../icons/logo-halal.png';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: res } = await axios.post("/users/login", {
        email,
        password,
      });

      setLocalStorage("token", res.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      setError("");
      navigate("/dashboard");
    } catch ({ response }) {
      response.data[0] ? setError(response.data[0].message) : setError(response.data.message);
    }
  }

  const checkIsLogin = async () => {
    try {
        const res = await axios.get("/users/token");
        if (res.status === 200){
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    checkIsLogin(); 
  }, []);
  
  return (
    <div className={style.flex_container}>

    <div className={style.left}>
        <div className={style.back_button}>
        <a href="/" ><FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Peta</a>
        </div>
        <div className={style.form_container}>
          <div className={style.form_login}>
            <h2>Login Admin</h2>
            <form onSubmit={handleSubmit}>
            <label>Email</label><br/>
            <input 
            className={style.login_input} 
            type="email" 
            placeholder="Masukkan Email" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
            required/><br/>
            <label>Password</label><br/>
            <input 
            className={style.login_input} 
            type="password" 
            placeholder="Masukkan Password" 
            name="password"
            onChange={(e) => setPassword(e.target.value)} 
            required
            minLength="6"/><br/>
            {error && <div className={`${style.alert} danger`}>{error}</div>}
            <button className={style.login_button}>
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