import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Import routes
import authRoute from './api/auth/login.js';
import summaryRoute from './api/summary/index.js';
import reportsRoute from './api/reports/index.js';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://vaishnavreddy120103_db_user:Lh6UMlwKVi4IKIEn@genaistats.r2qkxlf.mongodb.net/"

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.error('Please check your MongoDB connection string and credentials');
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/summary', summaryRoute);
app.use('/api/reports', reportsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

