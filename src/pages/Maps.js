import style from "../Style/maps.module.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";


import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
    iconUrl: require("../icons/marker-icon.png"),
    iconSize: [30, 30] // size of the icon
  });

// markers
const markers = [
    {
      geocode: [-6.884864540043645, 107.61351436542057],
      nama: "McDonalds Simpang Dago",
      alamat: "Dago, Coblong"
    },
    {
      geocode: [-6.883745917496636, 107.61475139219755],
      nama: "RM Pagi Sero",
      alamat: "Dago, Coblong"
    },
    {
      geocode: [-6.888782225238749, 107.61314860883988],
      nama: "Mie Gacoan Dago",
      alamat: "Dago, Coblong"
    }
  ];

  export default function Maps() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        navigate('login');
      };
    return (
      <div className={style.container}>
        <div className={style.map}>
        <MapContainer className={style.leaflet_container} center={[-6.92161129558201, 107.60699406029568]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.nama} <br/> {marker.alamat}</Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
        <div class={style.topleft}>
          <form>
            <select name = "category">
            <option>Semua Kategori</option>
            <option>Restoran</option>
            <option>Rumah Makan</option>
            <option>Catering</option>
            </select>
            <br/>
            <div className={style.form_search}>
              <input type="search" name="search" placeholder="&#xf002;  Cari Restoran"/>
            </div>
          </form>
        </div>
        <div className={style.topright}> 
        <button className={style.login} onClick={event => handleClick(event)}>
        Login <FontAwesomeIcon icon={faRightToBracket} />
        </button>
        </div>
      </div>
    );
  }