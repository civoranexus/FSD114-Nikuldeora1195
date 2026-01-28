import axios from "./axiosInstance";

// Create section
export const createSection = (data) =>
  axios.post("/content/sections", data);

// Create lesson
export const createLesson = (data) =>
  axios.post("/content/lessons", data);

// Get course content
export const getCourseContent = (courseId) =>
  axios.get(`/content/course/${courseId}`);
