import React, { useState, useEffect } from 'react'
import style from "./listrestoran.module.css";
import axios from "axios";
import { saveAs } from 'file-saver';
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListRestoran = () => {
    const [restorans, setRestorans] = useState([]);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(false)
    const [id, setId] = useState('');

    useEffect(() => {
        getRestorans();
      }, []);

    const getRestorans = async (e) => {
        const dataRestorans = await axios.get("/restorans");
        setRestorans(dataRestorans.data.data);
    };

    const onSearch = async (e) => {
        const dataRestorans = await axios.get(`/restorans?search=${e.target.value}`);
        setRestorans(dataRestorans.data.data);
    };

    const exportHandle = async () => {
        axios.get('/export/create-pdf')
        .then(() => axios.get('/export/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'data.pdf');
        });
    };

    const deleteRestoran = async (id) => {
        try {
          await axios.delete(`/restorans/${id}`);
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
            <button className={style.export_button} onClick = {exportHandle}>
                Export Ke PDF
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
        {show ? <Modal className={style.modal} getRestoran={() => getRestorans()} onClose={() => setShow(false)} show={show} id={id} title={title}/> : null}
    </div>
  )
}

export default ListRestoran