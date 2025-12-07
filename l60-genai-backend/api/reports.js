import { connectToDatabase } from '../lib/mongodb.js';
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

    // Connect to database
    const { db } = await connectToDatabase();
    const Chart = db.collection('chartdatas');

    // Get all required data in parallel
    const [
      marketGrowth,
      marketShare,
      productivityGains,
      adoptionBarriers
    ] = await Promise.all([
      Chart.findOne({ key: 'market-growth' }),
      Chart.findOne({ key: 'market-share' }),
      Chart.findOne({ key: 'productivity-gains' }),
      Chart.findOne({ key: 'adoption-barriers' })
    ]);
    
    // Return combined data
    return res.status(200).json({
      marketGrowth: marketGrowth ? marketGrowth.data : [],
      marketShare: marketShare ? marketShare.data : [],
      productivityGains: productivityGains ? productivityGains.data : [],
      adoptionBarriers: adoptionBarriers ? adoptionBarriers.data : [],
      descriptions: {
        marketGrowth: 'This chart illustrates the exponential growth of the Generative AI market from 2022 to 2032. The market has grown from $29 billion in 2022 to $44.89 billion in 2024, representing a 54.7% increase. Projections show the market exceeding $66.62 billion by the end of 2025 and potentially reaching $1.3 trillion by 2032. This growth is driven by enterprise adoption, increased investment in AI infrastructure, and the proliferation of AI-powered applications across industries. The data is sourced from Statista, Bloomberg Intelligence, and Grandview Research market analysis reports.',
        marketShare: 'This chart displays the market share distribution of leading Generative AI tools in the consumer market. ChatGPT dominates with 62.5% market share as of late 2024, followed by Gemini at 12.3%, Claude at 8.5%, and DeepSeek at 9.2%. Other tools collectively account for 7.5% of the market. ChatGPT had 525.9 million unique visitors in March 2025, significantly outpacing competitors. The data reflects the competitive landscape and user preferences in the generative AI tool market, sourced from Backlinko and Semrush Traffic Analytics.',
        productivityGains: 'This chart shows measurable productivity improvements achieved through Generative AI adoption across different professional roles. Programmers using generative AI are 88% more productive, especially on repetitive tasks. Management consultants using AI tools complete tasks 25% faster with 40% higher quality. Chatbots save an average of 2 hours and 20 minutes per day. These statistics demonstrate the tangible business value of generative AI implementation, sourced from GitHub research, Harvard Business School studies, and HubSpot data.',
        adoptionBarriers: 'This chart identifies the primary barriers preventing wider Generative AI adoption in organizations. Cybersecurity concerns top the list at 58%, followed by lack of implementation skills at 62%, data governance concerns at 55%, team training requirements at 50%, and trust issues with AI outputs at 27.2%. These barriers highlight the need for better security frameworks, training programs, and governance policies to enable safe and effective AI adoption. Data sourced from Searce AI Maturity Tracker, Google Cloud research, and AI Accelerator Institute reports.'
      }
    });
  } catch (error) {
    console.error('Reports API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
