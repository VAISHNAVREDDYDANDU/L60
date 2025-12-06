const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const authRoute = require('./routes/auth');
const summaryRoute = require('./routes/summary');
const reportsRoute = require('./routes/reports');
require('dotenv').config();

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

