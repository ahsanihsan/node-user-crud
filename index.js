const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./configs/route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

// Edit CORS configuration in below method
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

const mongoURL =
  "mongodb://localhost:" + process.env.MONGO_PORT + "/web-project";

mongoose.connect(mongoURL);

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  const error = new Error("Unable to fetch the record (not found)");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    success: false
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ` + process.env.PORT)
);
