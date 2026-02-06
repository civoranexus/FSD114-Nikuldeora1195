const Course = require("../models/Course");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");

/**
 * @desc Create a new section inside a course
 * @route POST /api/content/sections
 * @access Teacher
 */
const createSection = async (req, res) => {
  try {
    const { title, courseId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!title || !courseId) {
      return res.status(400).json({
        message: "Title and courseId are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to modify this course",
      });
    }

    const section = await Section.create({
      title,
      course: courseId,
    });

    res.status(201).json(section);
  } catch (error) {
    console.error("Create Section Error:", error);
    res.status(500).json({ message: "Failed to create section" });
  }
};

/**
 * @desc Create lesson inside a section
 * @route POST /api/content/lessons
 * @access Teacher
 */
const createLesson = async (req, res) => {
  try {
    const { title, content, imageUrl, sectionId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!title || !content || !sectionId) {
      return res.status(400).json({
        message: "Title, content and sectionId are required",
      });
    }

    const section = await Section.findById(sectionId).populate("course");
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (section.course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to modify this course",
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      imageUrl: imageUrl || "",
      section: sectionId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error("Create Lesson Error:", error);
    res.status(500).json({ message: "Failed to create lesson" });
  }
};

/**
 * @desc Get full course content (sections + lessons)
 * @route GET /api/content/course/:courseId
 * @access Student & Teacher
 */
const mongoose = require("mongoose");

const getCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params;

    // 🔐 GUARD: invalid or missing courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid or missing courseId",
      });
    }

    const sections = await Section.find({ course: courseId })
      .sort({ order: 1 })
      .lean();

    const sectionIds = sections.map((s) => s._id);

    const lessons = await Lesson.find({
      section: { $in: sectionIds },
    }).sort({ order: 1 });

    const structured = sections.map((section) => ({
      ...section,
      lessons: lessons.filter(
        (lesson) =>
          lesson.section.toString() === section._id.toString()
      ),
    }));

    res.json(structured);
  } catch (error) {
    console.error("Get Course Content Error:", error);
    res.status(500).json({ message: "Failed to load course content" });
  }
};


module.exports = {
  createSection,
  createLesson,
  getCourseContent,
};

