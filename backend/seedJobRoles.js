import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRole from './models/JobRole.js';
import { defaultJobRoles } from './utils/seedData.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/resume_analytics';

async function seed() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding');

    const count = await JobRole.countDocuments();
    if (count > 0) {
      console.log(`⚠️ JobRole collection already has ${count} documents. Skipping seeding.`);
      process.exit(0);
    }

    await JobRole.insertMany(defaultJobRoles);
    console.log('🌱 Seeded default JobRoles successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
