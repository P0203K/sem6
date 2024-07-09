// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/students");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});
// Define Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

// Create Student model
const Student = mongoose.model("Student", studentSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

// Retrieve a list of all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve details of an individual student by ID
app.get("/students/:id", getStudent, (req, res) => {
  res.json(res.student);
});

// Add a new student to the database
app.post("/students", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update details of an existing student by ID
app.patch("/students/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.age != null) {
    res.student.age = req.body.age;
  }
  if (req.body.grade != null) {
    res.student.grade = req.body.grade;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student from the database by ID
app.delete("/students/:id", getStudent, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if(!student){
      res.json({message:"Student not found"})
    }
    await res.student.deleteOne();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to retrieve student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}
// CORS middleware
app.use(cors());
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
