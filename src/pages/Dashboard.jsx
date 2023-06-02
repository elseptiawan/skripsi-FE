import React, { useState, useEffect } from 'react'
import style from "../Style/dashboard.module.css";
import axios from "axios";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const navigate = useNavigate();
    const [restorans, setRestorans] = useState([]);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState();

    useEffect(() => {
        getRestorans();
      }, []);

    const getRestorans = async (e) => {
        const dataRestorans = await axios.get("http://localhost:3000/restorans");
        setRestorans(dataRestorans.data.data);
    };

    const handleClick = async (event) => {
        try {
            setLocalStorage("token", "");
            axios.defaults.headers.common["Authorization"] = "";
            navigate("/login");
          } catch (error) {
            console.log(error);
          }
    };
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
                <div className={style.button_container}>
                    <form>
                        <input type="search" name="search" placeholder="&#xf002;  Cari Restoran"/>
                    </form>
                    <button className={style.add_restoran} onClick = {() => [setShow(true), setTitle('Form Penambahan Restoran')]}>
                        Tambah Restoran
                    </button>
                </div>
                <div className={style.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th className={style.alamat}>Alamat</th>
                            <th>Kategori</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            
                        {restorans.map((restoran, index) => (
                            <tr key={restoran.id}>
                                <td>{index+1}</td>
                                <td>{restoran.nama}</td>
                                <td className={style.alamat}>{restoran.alamat}</td>
                                <td>{restoran.category.nama}</td>
                                <td><button onClick = {() => [setShow(true), setTitle('Form Edit Restoran')]}><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /></button> <button><FontAwesomeIcon icon={faTrash} className="icon_delete" /></button> </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal className={style.modal} onClose={() => setShow(false)} title={title} show={show}/>
    </div>
  )
}

export default Dashboard