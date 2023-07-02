import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./app.css"
import Maps from "./pages/Maps";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Maps/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
  );
}

export default App;