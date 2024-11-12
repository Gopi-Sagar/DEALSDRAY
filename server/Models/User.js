const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    f_username: {
      type: String,
      required: true,
      unique: true,
    },
    f_pwd: {
      type: String,
      required: true,
    },
  },
  { collection: "t_login" }
);

module.exports = mongoose.model("User", userSchema);
