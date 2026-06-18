import axios from "axios";

const API_URL =
    "https://cv-strore.onrender.com/api/contact";

export const sendMessage = (data) => {
    return axios.post(API_URL, data);
};