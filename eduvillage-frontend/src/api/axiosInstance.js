// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;


import axios from "axios";

// const axiosInstance = axios.create({
//   // baseURL: "http://localhost:5000/api",
//   baseURL: "https://fsd114-nikuldeora1195.onrender.com/api"

// });
const isLocal = window.location.hostname === "localhost";

const axiosInstance = axios.create({
  baseURL: isLocal 
    ? "http://localhost:5000/api" 
    : "https://fsd114-nikuldeora1195.onrender.com/api",
  withCredentials: true,
});

// 🔐 Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
