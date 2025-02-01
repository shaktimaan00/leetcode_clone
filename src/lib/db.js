// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('MONGODB_URI is not defined in environment variables');
// }

// let isConnected = false; // Track connection state

// export async function connectDB() {
//   if (isConnected) {
//     console.log('Using existing MongoDB connection');
//     return;
//   }

//   try {
//     const connection = await mongoose.connect(MONGODB_URI, {
//       dbName: 'leetcode', // Database name
//       serverSelectionTimeoutMS: 5000, // Timeout after 5s
//       retryWrites: true, 
//       w: 'majority'
//     });

//     isConnected = connection.connections[0].readyState === 1;
//     console.log('Connected to MongoDB Atlas');

//   } catch (error) {
//     console.error('MongoDB Connection Error:', error);
//     throw error;
//   }
// }


import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Cache the connection object in global scope
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection');
    const opts = {
      dbName: 'leetcode',
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority',
      bufferCommands: false, // Disable mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('Successfully connected to MongoDB');
        return mongoose;
      })
      .catch(error => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached = { conn: null, promise: null }; // Reset cache on failure
    throw error;
  }

  // Add event listeners for connection health
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
    cached = { conn: null, promise: null }; // Reset cache on disconnect
  });

  mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
    cached = { conn: null, promise: null }; // Reset cache on error
  });

  // Store in global scope for Next.js HMR (Hot Module Replacement)
  if (!global.mongoose) {
    global.mongoose = cached;
  }

  return cached.conn;
}