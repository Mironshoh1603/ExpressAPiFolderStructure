const mongoose = require("mongoose");

const CalculationSchema = new mongoose.Schema(
  {
    summa: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
        nalog: {
          type: Number,
        },
      },
    ],
    document_id: {
      type: mongoose.Schema.ObjectId,
      ref: "documents",
    },
  },
  {
    timestamps: true,
  }
);

const Calculation = mongoose.model("calculations", CalculationSchema);

module.exports = Calculation;
