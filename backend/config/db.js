import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
};
