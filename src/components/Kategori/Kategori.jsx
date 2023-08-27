import React, { useState, useEffect } from 'react'
import style from "./kategori.module.css";
import axios from "axios";
import ModalKategori from "../ModalKategori/ModalKategori";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Kategori= () => {
    const [kategori, setKategori] = useState([]);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(false)
    const [id, setId] = useState('');

    useEffect(() => {
        getKategori();
      }, []);

    const getKategori = async (e) => {
        const {data : res} = await axios.get("/categories");
        setKategori(res.response);
    };

    const deleteKategori = async (id) => {
        try {
          await axios.delete(`/categories/${id}`);
          getKategori();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div>
        <div className={style.button_container}>
            <button className={style.add_restoran} onClick = {() => [setShow(true), setTitle('Form Penambahan Kategori'), setId('')]}>
                Tambah Kategori
            </button>
        </div>
        <div className={style.table_container}>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th className={style.action}></th>
                    </tr>
                </thead>
                <tbody>                            
                    {kategori.map((kat, index) => (
                        <tr key={kat.kategori_id}>
                            <td>{index+1}</td>
                            <td>{kat.nama}</td>
                            <td className={style.action}><button onClick={() => {{ setShow(true); setTitle('Form Edit Kategori'); setId(kat.kategori_id) }}}><FontAwesomeIcon icon={faPenToSquare} className={style.icon_edit} /></button> <button onClick={() => deleteKategori(kat.kategori_id)}><FontAwesomeIcon icon={faTrash} className={style.icon_delete} /></button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {show ? <ModalKategori className={style.modal}  onClose={() => setShow(false)} getKategori={() => getKategori()} show={show} id={id} title={title}/> : null}
    </div>
  )
}

export default Kategori