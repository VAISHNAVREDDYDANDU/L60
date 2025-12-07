const router = require('express').Router();
const Chart = require('../models/chartData');
const auth = require('../middleware/auth');

// GET /api/summary
// Returns all data needed for the summary page
router.get('/', auth, async (req, res) => {
  try {
    // Get AI adoption data
    const aiAdoption = await Chart.findOne({ key: 'ai-adoption' });
    
    // Get demographic adoption data
    const demographicAdoption = await Chart.findOne({ key: 'demographic-adoption' });
    
    // Return combined data
    res.json({
      aiAdoption: aiAdoption ? aiAdoption.data : [],
      demographicAdoption: demographicAdoption ? demographicAdoption.data : [],
      metrics: {
        marketValue: {
          value: 44.89,
          unit: 'billion USD',
          trend: 54.7,
          trendDirection: 'up'
        },
        fortune500Adoption: {
          value: 92,
          unit: '%',
          trend: 15,
          trendDirection: 'up'
        },
        productivityGain: {
          value: 88,
          unit: '%',
          trend: 12,
          trendDirection: 'up'
        },
        marketProjection: {
          value: 1300,
          unit: 'billion USD',
          trend: 2800,
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
