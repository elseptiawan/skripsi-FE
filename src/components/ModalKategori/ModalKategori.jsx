import React , { useState, useEffect } from 'react';
import style from "./modalkategori.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalKategori = props => {
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(props.id){
      getCategoryById(props.id);
    }
  }, []);

  const getCategoryById = async (id) => {
    const {data : res} = await axios.get(`/categories/${id}`);
    setNama(res.response.nama);
  }

  const addCategory = async () => {
    try {
      await axios.post("/categories", {
        nama,
      });
      props.onClose();
      props.getKategori();
    } catch (error) {
      setError(error.response.data[0].message);
    }
  };

  const editCategory = async (id) => {
    try {
      await axios.put(`/categories/${id}`, {
        nama,
      });
      props.onClose();
      props.getKategori();
    } catch (error) {
      setError(error.response.data[0].message);
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
          {error && <div className={style.alert}>{error}</div>}
          <button >Simpan</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ModalKategori