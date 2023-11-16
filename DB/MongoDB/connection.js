require("dotenv").config()
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("MongoDB is not connected");
        console.log(error.message);
        process.exit(1)
    }
}


//------------------for Next.js-----------------//
module.exports = connectDB

import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;




//------------------for Next.js-----------------//
// check if db connected for first time

import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.DB_URL);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
