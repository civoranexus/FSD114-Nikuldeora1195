import axiosInstance from "./axiosInstance";

// student + teacher
export const getAnnouncements = () => {
  return axiosInstance.get("/announcements");
};

// teacher/admin
export const createAnnouncement = (data) => {
  return axiosInstance.post("/announcements", data);
};
