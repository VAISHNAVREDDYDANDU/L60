const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  key: String,      // e.g. 'ai-adoption' or 'genai-growth'
  data: Array       // array of { x: <label|number>, y: <number> }
});

module.exports = mongoose.model('ChartData', ChartDataSchema);

