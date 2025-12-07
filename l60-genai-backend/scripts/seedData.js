const mongoose = require('mongoose');
const Chart = require('../models/chartData');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://vaishnavreddy120103_db_user:Lh6UMlwKVi4IKIEn@genaistats.r2qkxlf.mongodb.net/"

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error(err));

// Chart data for Generative AI topic based on Mend.io statistics
const chartData = [
  {
    key: 'ai-adoption',
    data: [
      { x: 'Fortune 500 Companies', y: 92 },
      { x: 'Executives (Critical Belief)', y: 94 },
      { x: 'Tech Businesses (Plan to Adopt)', y: 64 },
      { x: 'Companies (Piloting)', y: 45 },
      { x: 'Marketing Departments', y: 73 },
      { x: 'IT Leaders (Essential)', y: 86 }
    ]
  },
  {
    key: 'market-growth',
    data: [
      { x: 2022, y: 29 },   // $29 billion
      { x: 2023, y: 35 },   // Estimated
      { x: 2024, y: 44.89 }, // $44.89 billion
      { x: 2025, y: 66.62 }, // Projected $66.62 billion
      { x: 2026, y: 85 },    // Estimated
      { x: 2032, y: 1300 }   // $1.3 trillion (in billions)
    ]
  },
  {
    key: 'demographic-adoption',
    data: [
      { x: 'India', y: 73 },
      { x: 'Australia', y: 49 },
      { x: 'United States', y: 45 },
      { x: 'United Kingdom', y: 29 }
    ]
  },
  {
    key: 'productivity-gains',
    data: [
      { x: 'Programmers', y: 88 },
      { x: 'Management Consultants (Speed)', y: 25 },
      { x: 'Management Consultants (Quality)', y: 40 },
      { x: 'Chatbot Time Saved (hours/day)', y: 2.33 }
    ]
  },
  {
    key: 'market-share',
    data: [
      { x: 'ChatGPT', y: 62.5 },
      { x: 'Claude', y: 8.5 },
      { x: 'Gemini', y: 12.3 },
      { x: 'DeepSeek', y: 9.2 },
      { x: 'Other', y: 7.5 }
    ]
  },
  {
    key: 'adoption-barriers',
    data: [
      { x: 'Cybersecurity Concerns', y: 58 },
      { x: 'Data Governance', y: 55 },
      { x: 'Team Training', y: 50 },
      { x: 'Lack of Skills', y: 62 },
      { x: 'Trust Issues', y: 27.2 }
    ]
  },
  {
    key: 'workforce-impact',
    data: [
      { x: 'LinkedIn Members (25% Automatable)', y: 84 },
      { x: 'Jobs at High Risk by 2029', y: 10 },
      { x: 'Work Hours Automated by 2030', y: 30 },
      { x: 'Gen Z Users', y: 70 }
    ]
  },
  {
    key: 'investment-trends',
    data: [
      { x: 2022, y: 5.3 },   // Base year
      { x: 2023, y: 21.8 },  // $21.8 billion (407% increase)
      { x: 2024, y: 32.5 },  // Estimated
      { x: 2025, y: 200 }   // Projected $200 billion
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
