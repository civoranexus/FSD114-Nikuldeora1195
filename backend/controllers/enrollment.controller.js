// 


const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Student enrolls in a course
const enrollInCourse = async (req, res) => {
try {

    const courseId = req.params.courseId;
    const studentId = req.user.id;

    // Check if course exists and is published
    const course = await Course.findOne({
      _id: courseId,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({ message: "Course not available" });
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Enroll student
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all courses a student is enrolled in
const getMyCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId })
      .populate("course", "title description isPublished");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course progress (Student only)
const updateProgress = async (req, res) => {
    if (!enrollmentId) {
  return res.status(400).json({
    message: "Enrollment ID is required"
  });
}

  try {
    const enrollmentId = req.params.enrollmentId;
    const { progress } = req.body;

    // Validate progress value
    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100"
      });
    }

    // Find enrollment
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    // Ensure student owns this enrollment
    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to update this enrollment"
      });
    }

    // Update progress
    enrollment.progress = progress;

// If course completed
if (progress === 100) {
  enrollment.isCompleted = true;
  enrollment.completedAt = new Date();
}

    await enrollment.save();

    res.json({
      message: "Progress updated successfully",
      progress: enrollment.progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = { enrollInCourse,getMyCourses,
    updateProgress
 };