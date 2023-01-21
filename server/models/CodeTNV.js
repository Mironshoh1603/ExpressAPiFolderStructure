const mongoose = require("mongoose");

const CodeTNVSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CodeTNV = mongoose.model("codetnv", CodeTNVSchema);

module.exports = CodeTNV;
