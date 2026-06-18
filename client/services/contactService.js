import axios from "axios";

const API_URL =
    "http://localhost:5000/api/contact";

export const sendMessage = (data) => {
    return axios.post(API_URL, data);
};