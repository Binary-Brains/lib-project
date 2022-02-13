const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { sendSuccess, sendError } = require("./utility/helper");
const errors = require("./utility/errors");

require("./db/connect");

const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const libraryRoutes = require("./routes/library");

var app = express();

// Middlewares
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,content-encoding"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(cookieParser());
app.use(cors());

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/library", libraryRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));
});

module.exports = app;
