const axios = require('axios');
const User = require('../models/User');

async function getRecommendations(req, res) {
  try {
    const user = await User.findById(req.userId).populate('browsingHistory');
    const pythonApiUrl = 'http://https://b38c-34-106-228-186.ngrok-free.app//recommendations'; 

    const response = await axios.get(pythonApiUrl, {
      params: {
        user_id: req.userId,
        browsing_history: user.browsingHistory.map((property) => property._id),
      },
    });

    res.json({
      message: 'Recommended hotels fetched successfully!',
      recommendedHotels: response.data.recommended_hotels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching recommendations');
  }
}

module.exports = { getRecommendations };
