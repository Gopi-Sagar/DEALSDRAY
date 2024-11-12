const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { f_username, f_pwd } = req.body;

  try {
    const existingUser = await User.findOne({ f_username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(f_pwd, 10);

    const newUser = new User({
      f_username,
      f_pwd: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { f_username, f_pwd } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ f_username });

    if (!user) {
      console.log("User not found:", f_username);
      return res.status(400).json({ message: "Invalid login details" });
    }

    console.log("Stored Hashed Password:", user.f_pwd);
    console.log("Provided Password:", f_pwd);

    const isMatch = await bcrypt.compare(f_pwd, user.f_pwd);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login details" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
