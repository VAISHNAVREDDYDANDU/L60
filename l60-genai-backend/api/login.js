import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/mongodb.js';

const SECRET = process.env.JWT_SECRET || 'YourVerySecretKey';
const TEST_USER = { username: 'Lakshmi', password: 'Lakshmi' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    
    if (username !== TEST_USER.username || password !== TEST_USER.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
