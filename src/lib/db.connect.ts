import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI");
  }

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Successfully connected to MongoDB");
        return mongoose;
      })
      .catch(() => {
        throw new Error("Error connecting to MongoDB");
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
