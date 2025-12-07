const router = require('express').Router();
const Chart = require('../models/chartData');
const auth = require('../middleware/auth');

// GET /api/summary
// Returns all data needed for the summary page
router.get('/', auth, async (req, res) => {
  try {
    // Get all required data in parallel
    const [
      aiAdoption,
      demographicAdoption,
      metricsData
    ] = await Promise.all([
      Chart.findOne({ key: 'ai-adoption' }),
      Chart.findOne({ key: 'demographic-adoption' }),
      Chart.findOne({ key: 'metrics' })
    ]);
    
    // Return combined data
    res.json({
      aiAdoption: aiAdoption ? aiAdoption.data : [],
      demographicAdoption: demographicAdoption ? demographicAdoption.data : [],
      metrics: metricsData ? metricsData.data : {}
    });
  } catch (err) {
    console.error('Summary API error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
