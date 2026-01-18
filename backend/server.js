const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const protectedRoutes = require("./routes/protected.routes");
app.use("/api/protected",protectedRoutes);


const roleTestRoutes = require("./routes/role-test.routes");
app.use("/api/role-test",roleTestRoutes);

const courseRoutes = require("./routes/course.routes");
app.use("/api/courses", courseRoutes);

const enrollmentRoutes = require("./routes/enrollment.routes");
app.use("/api/enroll",enrollmentRoutes);


const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

const notificationRoutes = require("./routes/notification.routes");
app.use("/api/notifications", notificationRoutes);

