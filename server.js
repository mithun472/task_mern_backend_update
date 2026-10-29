// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Make sure MongoDB Compass or local server is running)
mongoose.connect("mongodb://localhost:27017/Mern_employee_1")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Mongoose Schema and Model
const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number
});
const Employee = mongoose.model("emp01", employeeSchema);

// --- GET Method: Fetch all employees ---
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// --- Optional: GET employee by name ---
app.get("/employees/:name", async (req, res) => {
  try {
    const emp1 = await Employee.findOne({ name: req.params.name });
    if (!emp1) return res.status(404).json({ message: "Employee not found" });
    res.json(emp1);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
