const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utils/chalkMorgan")
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialData/initialData");
const chalk = require("chalk");
const app = express();

console.log("file", config.get("file"));

// app.use(cors());
app.use(cors({
  origin: 'https://clint-dgar.onrender.com'
}));

app.use(logger)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/admin", express.static(path.join(__dirname, "admin")));
initialData();
app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
