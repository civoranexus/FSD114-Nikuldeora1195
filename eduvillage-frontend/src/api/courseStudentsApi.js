import axios from "axios";

const API = axios.create({
  baseURL: "https://fsd114-nikuldeora1195.onrender.com/api",
});

// Attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getCourseStudents = (courseId) => {
  return API.get(`/courses/${courseId}/students`);
};
