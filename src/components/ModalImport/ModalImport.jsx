import React, {useState} from 'react'
import style from "./modalimport.module.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalImport = (props) => {
    const [error, setError] = useState("");
    const [file, setFile] = useState();

    const handleSubmit = async (e) => { 
        e.preventDefault();   
        try {
            const formData = new FormData();
            formData.append("file", file);
            await axios.post("/import", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                "x-rapidapi-key": "your-rapidapi-key-here",
              },
            });
            props.onClose();
            props.getRestoran();
          } catch (error) {
            console.log(error.response);
          }
      }
    return (
        <div className={style.modal} onClick={props.onClose}>
        <div className={style.modal_content} onClick={e => e.stopPropagation()}>
            <div className={style.modal_header}>
            <h4>Import Data</h4>
            <button onClick={props.onClose} >
            <FontAwesomeIcon icon={faXmark} className="icon_close" />
            </button>
            </div>
            <p>Format File yang didukung : xls/xlsx</p>
            <p><span>Note:</span></p>
            <p>1. Pastikan anda telah menambahkan kategori untuk data yang ingin ditambahkan</p>
            <p>2. File Excel harus mengandung kolom Nama, Kecamatan, Alamat, Nomor Sertifikat, Latitude, dan Longtitude</p><br />
            <div className={style.modal_body}>
            <form onSubmit={handleSubmit}>
                <label>Masukkan File</label><br/>
                <input 
                type="file" 
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                placeholder='Masukkan Nama Restoran/Rumah Makan'
                /><br/>
                {error && <div className={style.alert}>{error}</div>}
                <button >Import</button>
            </form>
            </div>
        </div>
        </div>
    )
}

export default ModalImport