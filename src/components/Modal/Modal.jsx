import React , { useState, useEffect } from 'react';
import style from "./modal.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = props => {
  const nama_kecamatan = [
    'Andir',
    'Astana Anyar',
    'Antapani',
    'Arcamanik',
    'Babakan Ciparay',
    'Bandung Kidul',
    'Bandung Kulon',
    'Bandung Wetan',
    'Batununggal',
    'Bojongloa Kaler',
    'Bojongloa Kidul',
    'Buah Batu',
    'Cibeunying Kaler',
    'Cibeunying Kidul',
    'Cibiru',
    'Cicendo',
    'Cinambo',
    'Coblong',
    'GedeBage',
    'KiaraCondong',
    'Lengkong',
    'MandalaJati',
    'Panyileukan',
    'Rancasari',
    'Regol',
    'Sukajadi',
    'Sukasari',
    'Sumur Bandung',
    'Ujung Berung'
  ];

  const [categories, setCategories] = useState([]);
  const [nama, setNama] = useState("");
  const [no_sertifikat, setNoSertifikat] = useState("");
  const [kategori_id, setKategoriId] = useState("1");
  const [kecamatan, setKecamatan] = useState(nama_kecamatan[0]);
  const [alamat, setAlamat] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if(props.id){
      getRestoransById(props.id);
    }
  }, []);

  const getCategories = async () => {
    const dataCategories = await axios.get("/categories");
    setCategories(dataCategories.data.response);
  }

  const getRestoransById = async (id) => {
    const {data : res} = await axios.get(`/restorans/${id}`);
    setNama(res.data.nama);
    setNoSertifikat(res.data.no_sertifikat);
    setKategoriId(res.data.kategori_id);
    setKecamatan(res.data.kecamatan);
    setAlamat(res.data.alamat);
    setLatitude(res.data.latitude);
    setLongtitude(res.data.longtitude);
  }

  const addRestoran = async () => {
    try {
      await axios.post("/restorans", {
        nama,
        no_sertifikat,
        kategori_id,
        kecamatan,
        alamat,
        latitude,
        longtitude,
      });
      props.onClose();
      props.getRestoran();
    } catch (error) {
      console.log(error);
    }
  };

  const editRestoran = async (id) => {
    try {
      await axios.put(`/restorans/${id}`, {
        nama,
        no_sertifikat,
        kategori_id,
        kecamatan,
        alamat,
        latitude,
        longtitude,
      });
      props.onClose();
      props.getRestoran();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();   
    if(props.id){
      editRestoran(props.id)
    }
    else{
      addRestoran();
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
          <label>Nama Restoran/Rumah Makan</label><br/>
          <input 
          type="text" 
          name="nama_restoran"
          onChange={(e) => setNama(e.target.value)}
          value={nama} 
          placeholder='Masukkan Nama Restoran/Rumah Makan'
          /><br/>
          <label>Nomor Sertifikat Halal</label><br/>
          <input 
          type="text" 
          name="no_sertifikat" 
          onChange={(e) => setNoSertifikat(e.target.value)}
          value={no_sertifikat}
          placeholder='Masukkan Nomor Sertifikat Halal'
          /><br/>
          <label>Kategori</label><br/>
          <select onChange={(e) => setKategoriId(e.target.value)} value={kategori_id} name="kategori">
            <option value="" disabled selected>Pilih Kategori</option>
            {categories.map((category, index) => (
              <option key={index} value={category.kategori_id}>{category.nama}</option>
            ))}
          </select><br/>
          <label>Kecamatan</label><br/>
          <select onChange={(e) => setKecamatan(e.target.value)} value={kecamatan} name="kecamatan" id="kecamatan" >
            <option value="" disabled selected>Pilih Kecamatan</option>
            {nama_kecamatan.map((element, index) => (
              <option key={index} value={element}>{element}</option>
            ))}
          </select><br/>
          <label>Alamat</label><br/>
          <textarea 
          placeholder='Masukkan Alamat' 
          name="alamat" 
          onChange={(e) => setAlamat(e.target.value)}
          value={alamat}
          rows="4" 
          cols="50"
          ></textarea><br/>
          <label>Latitude</label><br/>
          <input 
          type="text" 
          name="latitude" 
          onChange={(e) => setLatitude(e.target.value)}
          value={latitude}
          placeholder='Masukkan Latitude'
          /><br/>
          <label>Longtitude</label><br/>
          <input 
          type="text" 
          name="longtitude" 
          onChange={(e) => setLongtitude(e.target.value)}
          value={longtitude}
          placeholder='Masukkan Longtitude'
          /><br/>
          <button >Simpan</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Modal