const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.db_Key;
console.log(uri)
const mongoURI = `${uri}`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log("Successfully Connected to MongoDB!");
  } catch (error) {
    console.error("Error occurred while connecting to the database:", error);
  }
};
module.exports = connectToMongo;
