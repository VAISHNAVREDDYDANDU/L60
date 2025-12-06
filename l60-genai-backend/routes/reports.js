const router = require('express').Router();
const Chart = require('../models/chartData');
const auth = require('../middleware/auth');

// GET /api/reports
// Returns all data needed for the reports page
router.get('/', auth, async (req, res) => {
  try {
    // Get GenAI market growth data
    const marketGrowth = await Chart.findOne({ key: 'market-growth' });
    
    // Get use case distribution data
    const useCaseDistribution = await Chart.findOne({ key: 'use-case-distribution' });
    
    // Return combined data
    res.json({
      marketGrowth: marketGrowth ? marketGrowth.data : [],
      useCaseDistribution: useCaseDistribution ? useCaseDistribution.data : [],
      descriptions: {
        marketGrowth: 'This chart illustrates the exponential growth of the Generative AI market over the past 6 months. The data shows market valuation increasing from $15 billion in July 2024 to $42 billion in December 2024, representing a 180% growth rate. This growth is driven by enterprise adoption, increased investment in AI infrastructure, and the proliferation of AI-powered applications across industries. The data is sourced from industry reports and market analysis from leading technology research firms.',
        useCaseDistribution: 'This chart displays the distribution of Generative AI use cases across different industry sectors. Customer experience applications lead with 32% adoption, followed by content creation at 24%, process automation at 18%, data analytics at 15%, and other applications at 11%. This distribution reflects the current focus on customer-facing applications and content generation capabilities. The data is based on surveys of enterprise AI implementations and industry adoption patterns from the last 6 months.'
      }
    });
  } catch (err) {
    console.error('Reports API error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

