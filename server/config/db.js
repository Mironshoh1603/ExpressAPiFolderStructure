const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("DATABASE connected");
  })
  .catch((err) => {
    console.log("database error...");
  });
