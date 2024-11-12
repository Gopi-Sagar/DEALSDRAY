const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    f_Id: {
      type: String,
      required: true,
      unique: true,
    },
    f_Name: {
      type: String,
      required: true,
    },
    f_Email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    f_Mobile: {
      type: String,
      required: true,
      match: /^\d+$/,
    },
    f_Designation: {
      type: String,
      required: true,
    },
    f_Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    f_Course: {
      type: String,
      required: true,
    },
    f_Image: {
      type: String,
      match: /\.(jpg|jpeg|png)$/i,
    },
    f_Createdate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "t_employee" }
);

module.exports = mongoose.model("Employee", employeeSchema);
