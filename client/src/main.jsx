import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import './index.css'
import App from './App.jsx'

document.documentElement.style.overflowX = "hidden";
document.body.style.overflowX = "hidden";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
)
