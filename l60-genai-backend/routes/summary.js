const router = require('express').Router();
const Chart = require('../models/chartData');
const auth = require('../middleware/auth');

// GET /api/summary
// Returns all data needed for the summary page
router.get('/', auth, async (req, res) => {
  try {
    // Get AI adoption data
    const aiAdoption = await Chart.findOne({ key: 'ai-adoption' });
    
    // Get industry implementation data
    const industryImplementation = await Chart.findOne({ key: 'industry-implementation' });
    
    // Return combined data
    res.json({
      aiAdoption: aiAdoption ? aiAdoption.data : [],
      industryImplementation: industryImplementation ? industryImplementation.data : [],
      metrics: {
        enterpriseAdoption: {
          value: 87,
          trend: 12,
          trendDirection: 'up'
        },
        productivityGain: {
          value: 35,
          unit: '%',
          trend: 5,
          trendDirection: 'up'
        },
        costReduction: {
          value: 28,
          unit: '%',
          trend: 4,
          trendDirection: 'up'
        },
        innovationRate: {
          value: 142,
          unit: '%',
          trend: 18,
          trendDirection: 'up'
        }
      }
    });
  } catch (err) {
    console.error('Summary API error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

