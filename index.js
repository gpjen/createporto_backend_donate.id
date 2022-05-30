// import
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./app/db/models");

const app = express();
const port = process.env.APP_PORT || 3000;

//midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("oke baik");
});

//error handling
app.use((req, res, next) => {
  let err = new Error(`${req.method} => ${req.path} not found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({
    status: "failed",
    message: err.message,
  });
});

// run server
app.listen(port, async () => {
  console.log(`app listen on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("> database conection success");
  } catch (error) {
    console.log("### ", error.message);
  }
});
