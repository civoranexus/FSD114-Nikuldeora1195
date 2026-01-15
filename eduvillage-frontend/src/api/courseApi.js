import axiosInstance from "./axiosInstance";

// student
export const getPublishedCourses = () => {
  return axiosInstance.get("/courses");
};

export const enrollCourse = (courseId) => {
  return axiosInstance.post(`/enroll/${courseId}`);
};

export const getMyEnrollments = () => {
  return axiosInstance.get("/enroll/my");
};

// teacher
export const getTeacherCourses = () => {
  return axiosInstance.get("/courses/my");
};
