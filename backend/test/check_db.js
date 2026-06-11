import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRole from '../models/JobRole.js';

dotenv.config();

async function run() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_analytics';
    console.log('Connecting to:', uri);
    await mongoose.connect(uri);
    console.log('Connected!');
    
    const count = await JobRole.countDocuments();
    console.log('JobRole count in DB:', count);
    
    if (count === 0) {
      console.log('No job roles found. We need to seed job roles!');
    } else {
      const roles = await JobRole.find({}, { title: 1 });
      console.log('Available roles:', roles);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
