//------------------ roote/lib/conntect.js (lama dev) -----------------//
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



//------------------ roote/lib/utils.js (lama dev) -----------------//
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


//------------------ roote/lib/utils.js (lama dev) -----------------for cached
// This example for cached connection
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}


//------------------for Next.js-----------------//
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.DB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.DB_URL
const options = {}

let client
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
