import React , { useState, useEffect } from 'react';
import style from "./modalkategori.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalKategori = props => {
  const [nama, setNama] = useState("");

  useEffect(() => {
    if(props.id){
      getCategoryById(props.id);
      console.log(props.id);
    }
  }, []);

  const getCategoryById = async (id) => {
    const {data : res} = await axios.get(`http://localhost:3000/categories/${id}`);
    setNama(res.response.nama);
  }

  const addCategory = async () => {
    try {
      await axios.post("http://localhost:3000/categories", {
        nama,
      });
      props.onClose();
      props.getKategori();
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (id) => {
    try {
      await axios.put(`http://localhost:3000/categories/${id}`, {
        nama,
      });
      props.onClose();
      props.getKategori();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();   
    if(props.id){
      editCategory(props.id)
    }
    else{
      addCategory();
    }
  }

  return (
    <div className={style.modal} onClick={props.onClose}>
      <div className={style.modal_content} onClick={e => e.stopPropagation()}>
        <div className={style.modal_header}>
          <h4>{props.title}</h4>
          <button onClick={props.onClose} >
          <FontAwesomeIcon icon={faXmark} className="icon_close" />
          </button>
        </div>
        <div className={style.modal_body}>
        <form onSubmit={handleSubmit}>
          <label>Nama Kategori</label><br/>
          <input 
          type="text" 
          name="nama_kategori"
          onChange={(e) => setNama(e.target.value)}
          value={nama} 
          placeholder='Masukkan Nama Kategori'
          /><br/>
          <button >Simpan</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ModalKategori