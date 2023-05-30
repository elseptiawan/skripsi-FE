import React from 'react'
import style from "../Style/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        navigate('../login');
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
                    <button className={style.add_restoran}>
                        Tambah Restoran
                    </button>
                </div>
                <div className={style.table_container}>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Kategori</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Restoran A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Restoran</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Catering A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Catering</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        <tr>
                            <td>13</td>
                            <td>Rumah Makan A</td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</td>
                            <td>Rumah Makan</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /> <FontAwesomeIcon icon={faTrash} className="icon_delete" /> </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard