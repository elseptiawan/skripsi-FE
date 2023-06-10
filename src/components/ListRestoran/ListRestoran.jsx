import React, { useState, useEffect } from 'react'
import style from "./listrestoran.module.css";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../scripts/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListRestoran = () => {
    const navigate = useNavigate();
    const [restorans, setRestorans] = useState([]);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(false)
    const [id, setId] = useState('');

    useEffect(() => {
        getRestorans();
      }, []);

    const getRestorans = async (e) => {
        const dataRestorans = await axios.get("http://localhost:3000/restorans");
        setRestorans(dataRestorans.data.data);
    };

    const onSearch = async (e) => {
        const dataRestorans = await axios.get(`http://localhost:3000/restorans?search=${e.target.value}`);
        setRestorans(dataRestorans.data.data);
    };

    const deleteRestoran = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/restorans/${id}`);
          getRestorans();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div>
        <div className={style.button_container}>
            <input type="search" name="search" placeholder="&#xf002;  Cari Restoran" onChange={onSearch}/>
            <button className={style.add_restoran} onClick = {() => [setShow(true), setTitle('Form Penambahan Restoran'), setId('')]}>
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
                            <td><button onClick = {() => [setShow(true), setTitle('Form Edit Restoran'), setId(restoran.id)]}><FontAwesomeIcon icon={faPenToSquare} className="icon_edit" /></button> <button onClick={() => deleteRestoran(restoran.id)}><FontAwesomeIcon icon={faTrash} className="icon_delete" /></button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {show ? <Modal className={style.modal} getRestoran={() => getRestorans()} onClose={() => setShow(false)} show={show} id={id}/> : null}
    </div>
  )
}

export default ListRestoran