import mongoose from 'mongoose';
import { Booking } from '../models/booking.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI;

    await mongoose.connect(mongoUrl);

    console.log('✅ MongoDB connection established successfully');
    await Booking.syncIndexes(); //змінив Note на Booking...хотя можна тут нічого не подавати...але це створює папку в БД
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
