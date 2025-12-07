const router = require('express').Router();
const Chart = require('../models/chartData');
const auth = require('../middleware/auth');

// GET /api/reports
// Returns all data needed for the reports page
router.get('/', auth, async (req, res) => {
  try {
    // Get market growth data
    const marketGrowth = await Chart.findOne({ key: 'market-growth' });
    
    // Get market share data
    const marketShare = await Chart.findOne({ key: 'market-share' });
    
    // Get productivity gains data
    const productivityGains = await Chart.findOne({ key: 'productivity-gains' });
    
    // Get adoption barriers data
    const adoptionBarriers = await Chart.findOne({ key: 'adoption-barriers' });
    
    // Return combined data
    res.json({
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
  } catch (err) {
    console.error('Reports API error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
