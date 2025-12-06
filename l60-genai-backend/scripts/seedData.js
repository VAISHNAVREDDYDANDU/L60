const mongoose = require('mongoose');
const Chart = require('../models/chartData');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://saideepthi2001:Mongodb1@evchargers.5aqwwgv.mongodb.net/"

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error(err));

// Chart data for Generative AI topic
const chartData = [
  {
    key: 'ai-adoption',
    data: [
      { x: 'July 2024', y: 65 },
      { x: 'August 2024', y: 70 },
      { x: 'September 2024', y: 75 },
      { x: 'October 2024', y: 79 },
      { x: 'November 2024', y: 83 },
      { x: 'December 2024', y: 87 }
    ]
  },
  {
    key: 'industry-implementation',
    data: [
      { x: 'Technology', y: 28 },
      { x: 'Financial Services', y: 22 },
      { x: 'Healthcare', y: 18 },
      { x: 'Retail', y: 15 },
      { x: 'Manufacturing', y: 10 },
      { x: 'Other', y: 7 }
    ]
  },
  {
    key: 'market-growth',
    data: [
      { x: 1, y: 15 },  // July 2024
      { x: 2, y: 18 },  // August 2024
      { x: 3, y: 22 },  // September 2024
      { x: 4, y: 28 },  // October 2024
      { x: 5, y: 35 },  // November 2024
      { x: 6, y: 42 }   // December 2024
    ]
  },
  {
    key: 'use-case-distribution',
    data: [
      { x: 'Customer Experience', y: 32 },
      { x: 'Content Creation', y: 24 },
      { x: 'Process Automation', y: 18 },
      { x: 'Data Analytics', y: 15 },
      { x: 'Other', y: 11 }
    ]
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Chart.deleteMany({});
    console.log('Cleared existing chart data');

    // Insert new data
    await Chart.insertMany(chartData);
    console.log('Successfully seeded chart data');

    // Verify data
    const count = await Chart.countDocuments();
    console.log(`Total documents in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

