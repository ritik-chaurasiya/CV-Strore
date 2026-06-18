import axios from "axios";

const API_URL = "https://cv-strore.onrender.com/api/admin";

export const adminSignup = (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const verifyAdminOTP = (data) => {
  return axios.post(`${API_URL}/verify-otp`, data);
};

export const adminLogin = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const getDashboardStats =
    async () => {

        return await axios.get(
            "https://cv-strore.onrender.com/api/admin/dashboard-stats"
        );

  };
    
export const getMonthlyRevenue =
    async () => {

        return await axios.get(
            "https://cv-strore.onrender.com/api/admin/monthly-revenue"
        );

    };  