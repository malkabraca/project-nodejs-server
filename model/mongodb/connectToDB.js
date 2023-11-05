const config = require("config");
const mongoose = require("mongoose");
const {NODE_ENV, DATABASE_URL_MONGO } = process.env;

// console.log("con str", config.get("dbConfig.url"));

// const connectToDB = () => {
//   return mongoose.connect(config.get("dbConfig.url"));
// };
const connectToDB = () => {
  return mongoose.connect(
  NODE_ENV === 'production' ? DATABASE_URL_MONGO : 'mongodb://127.0.0.1:27017/final_project',
);
}
module.exports = connectToDB;
