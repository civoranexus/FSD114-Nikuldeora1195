import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Teacher creates course
export const createCourse = (data) => {
  return API.post("/courses", data);
};

// Teacher gets own courses
export const getMyCourses = () => {
  return API.get("/courses/my");
};

// Publish course
export const publishCourse = (id) => {
  return API.put(`/courses/${id}/publish`);
};


// Get single course (teacher)
export const getCourseById = (id) => {
  return API.get(`/courses/${id}`);
};

// Update course
export const updateCourse = (id, data) => {
  return API.put(`/courses/${id}`, data);
};
