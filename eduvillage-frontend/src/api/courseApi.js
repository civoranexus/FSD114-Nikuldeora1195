import axiosInstance from "./axiosInstance";

// student
export const getPublishedCourses = () => {
  return axiosInstance.get("/courses");
};

export const enrollCourse = (courseId) => {
  return axiosInstance.post(`/enroll/${courseId}`);
};

export const getMyEnrollments = () => {
  return axiosInstance.get("/enroll/my-courses");
};

// teacher
export const getTeacherCourses = () => {
  return axiosInstance.get("/courses/my");
};

export const togglePublishCourse = (courseId) => {
  return axiosInstance.patch(`/courses/${courseId}/publish`);
};

export const updateProgress = (enrollId, progress) => {
  return axiosInstance.patch(`/enroll/${enrollId}/progress`, {
    progress,
  });
};
