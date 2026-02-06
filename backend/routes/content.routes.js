const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const {
  createSection,
  createLesson,
  getCourseContent,
} = require("../controllers/content.controller");

// Teacher creates section
router.post(
  "/sections",
  protect,
  authorizeRoles("teacher"),
  createSection
);

// Teacher creates lesson
router.post(
  "/lessons",
  protect,
  authorizeRoles("teacher"),
  createLesson
);

// Student + Teacher view course content
router.get(
  "/course/:courseId",
  protect,
  authorizeRoles("student", "teacher"),
  getCourseContent
);

module.exports = router;
