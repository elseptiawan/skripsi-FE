import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const token = localStorage.getItem('token')

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
