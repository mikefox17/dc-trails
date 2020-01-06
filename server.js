const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// load env vars

dotenv.config({ path: "./config/config.env" });

const app = express();

//connect to db

connectDB();

//body parser

app.use(express.json());

app.use(cors());

//static folder

app.use(express.static(path.join(__dirname, "public")));

// routes

app.use("/api/v1/trails", require("./routes/trails"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `🌎  ==> Server running in ${process.env.NODE_ENV} mode on ${PORT}`
  )
);
