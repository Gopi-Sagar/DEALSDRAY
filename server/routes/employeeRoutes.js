const express = require("express");
const Employee = require("../Models/Employee");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
    console.log(...employees);
  } catch (error) {
    res.status(500).json({
      error: "Server error fetching employees",
      details: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =
    req.body;

  if (
    !f_Id ||
    !f_Name ||
    !f_Email ||
    !f_Mobile ||
    !f_Designation ||
    !f_Gender ||
    !f_Course
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEmployee = new Employee({
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate email or ID" });
    }
    res.status(500).json({
      error: "Server error creating employee",
      details: error.message,
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const {
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_Gender,
    f_Course,
    f_Image,
  } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Image,
        f_CreateDate: new Date(),
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      f_Id: req.params.id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      error: "Server error deleting employee",
      details: error.message,
    });
  }
});

router.get("/employee-count", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee count", error: error.message });
  }
});

module.exports = router;
