import { connectToDatabase } from '../../lib/mongodb.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'YourVerySecretKey';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    try {
      const { db } = await connectToDatabase();
      const Chart = db.collection('chartdatas');

      // Get all required data in parallel
      const [aiAdoption, demographicAdoption, metricsData] = await Promise.all([
        Chart.findOne({ key: 'ai-adoption' }),
        Chart.findOne({ key: 'demographic-adoption' }),
        Chart.findOne({ key: 'metrics' })
      ]);
      
      // Return combined data
      return res.status(200).json({
        aiAdoption: aiAdoption ? aiAdoption.data : [],
        demographicAdoption: demographicAdoption ? demographicAdoption.data : [],
        metrics: metricsData ? metricsData.data : {}
      });
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        message: 'Database error', 
        error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
