const express = require("express");
const AppError = require("../utility/appError");
const ErrorController = require("../controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const morgan = require("morgan");

const { urlencoded } = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
// const upload = multer();
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cookieParser());
app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(sanitize());

app.use(xss());

app.use(hpp());

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("tiny"));

app.get("/", (req, res) => res.send("Hello World!"));
app.all("*", function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});

app.use(ErrorController);

module.exports = app;
