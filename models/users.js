const mongoose = require("mongoose");

//creating User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    socketId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);


module.exports = User;
