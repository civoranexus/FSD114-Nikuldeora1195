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

// Student: enroll in course
export const enrollInCourse = (courseId) => {
  return API.post(`/enroll/${courseId}`);
};

// Student: get my enrollments
export const getMyEnrollments = () => {
  return API.get("/enroll/my-courses");
};
