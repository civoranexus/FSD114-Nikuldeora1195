const Course = require("../models/Course");

// Teacher creates a course
const createCourse = async (req, res) => {
  if (!title || !description) {
  return res.status(400).json({
    message: "Title and description are required"
  });
}




  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all published courses (student view)
const getCourses = async (req, res)=> {
  try {
  const courses = await Course.find({ isPublished:true })
  .populate("createdBy", "name email");

  res.json(courses);

  } catch (error){
    res.status(500).json({ message: error.message });
  }
};


// Publish a course (Teacher only)
const publishCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if this teacher owns the course
    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to publish this course" });
    }

    // Publish the course
    course.isPublished = true;
    await course.save();

    res.json({ message: "Course published successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const Enrollment = require("../models/Enrollment");

// Teacher dashboard: view students enrolled in my course
const getCourseStudents = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure teacher owns this course
    if (course.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to view enrollments"
      });
    }

    // Find enrollments
    const enrollments = await Enrollment.find({ course: courseId })
      .populate("student", "name email");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Teacher dashboard - my courses
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      createdBy: req.user.id
    });

    res.json(courses);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};




module.exports = {
  createCourse,
  getCourses,
  publishCourse,
  getCourseStudents,
  getMyCourses
};
