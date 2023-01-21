const mongoose = require("mongoose");

const userAdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 8,
    },
    photo: {
      type: String,
      default: "avatar.jpg",
    },
    birth_date: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "declarant", "accountant"],
    },
  },
  {
    timestamps: true,
  }
);
const UserAdmin = mongoose.model("userAdmins", userAdminSchema);

module.exports = UserAdmin;
