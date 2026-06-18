import axios from "axios";

const API = "https://cv-strore.onrender.com/api/auth";

export const signupUser = (data) =>
  axios.post(`${API}/signup`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);