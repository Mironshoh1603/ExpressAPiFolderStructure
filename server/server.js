const env = require("dotenv").config({ path: "config.env" });
const db = require("./config/db");
const app = require("./middleware/app");

const PORT = process.env.PORT || 8000;
// Unhandeled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥");
  console.log(err.name, err.message);
  process.exit(1);
});

// Unhandled Excpections
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Excpections 💥");
  console.log(err.name, err.message);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
