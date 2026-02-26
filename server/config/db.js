const dns = require('dns');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

let cached = global._mongooseConnection;
if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('⚠️  MONGODB_URI not set — database features will not work.');
      return false;
    }

    if (cached.conn && mongoose.connection.readyState === 1) {
      return true;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
    }

    cached.conn = await cached.promise;
    console.log(`✅ MongoDB Connected: ${cached.conn.connection.host}`);
    return true;
  } catch (error) {
    cached.promise = null;
    console.error(`⚠️  MongoDB Connection Failed: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
