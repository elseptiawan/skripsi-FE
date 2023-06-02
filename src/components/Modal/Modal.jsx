import React from 'react';
import style from "./modal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = props => {
  if (!props.show){
    return null
  }
  return (
    <div className={style.modal} onClick={props.onClose}>
      <div className={style.modal_content} onClick={e => e.stopPropagation()}>
        <div className={style.modal_header}>
          <h4>{props.title}</h4>
          <button onClick={props.onClose}>
          <FontAwesomeIcon icon={faXmark} className="icon_close" />
          </button>
        </div>
        <div className={style.modal_body}>
        <form>
          <label>Nama Restoran</label><br/>
          <input type="text" id="nama_restoran" name="nama_restoran" placeholder='Masukkan Nama Restoran'/><br/>
          <label>Nomor Sertifikat Halal</label><br/>
          <input type="text" id="no_sertifikat" name="no_sertifikat" placeholder='Masukkan Nomor Sertifikat Halal'/><br/>
          <label>Kategori</label><br/>
          <select name="kategori" id="kategori">
            <option value="" disabled selected>Pilih Kategori</option>
            <option value="Restoran">Restoran</option>
            <option value="Rumah Makan">Rumah Makan</option>
            <option value="Caterong">Caterong</option>
          </select><br/>
          <label>Kecamatan</label><br/>
          <select name="kecamatan" id="kecamatan">
            <option value="" disabled selected>Pilih Kecamatan</option>
            <option value="Coblong">Coblong</option>
            <option value="Astana Anyar">Astana Anyar</option>
            <option value="Antapani">Caterong</option>
          </select><br/>
          <label>Alamat</label><br/>
          <textarea placeholder='Masukkan Alamat' id="alamat" name="alamat" rows="4" cols="50"></textarea><br/>
          <label>Latitude</label><br/>
          <input type="text" id="latitude" name="latitude" placeholder='Masukkan Latitude'/><br/>
          <label>Longtitude</label><br/>
          <input type="text" id="longtitude" name="longtitude" placeholder='Masukkan Longtitude'/><br/>
          <button>Simpan</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Modal