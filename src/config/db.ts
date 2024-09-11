import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGO_URI as string;

    if (!mongoURI) {
      throw new Error("MongoDB URI not defined in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
