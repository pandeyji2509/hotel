const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction");
const authMiddleware = require("../middleware/auth");

const { PythonShell } = require("python-shell");

// Recommendation endpoint
router.post("/recommend", async (req, res) => {
    const { hotelName, rating, totalReview, location } = req.body;

    const options = {
        args: [hotelName, rating, totalReview, location],
    };

    PythonShell.run("recommend.py", options, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ recommendations: result });
    });
});


// Track user interaction with a property
router.post("/track", authMiddleware, async (req, res) => {
  try {
    const { hotelName, review, totalReview, rating, location } = req.body;
    const userId = req.user.id;

    const interaction = await Interaction.findOne({ userId, hotelName });

    if (interaction) {
      interaction.interactionCount += 1;
      interaction.rating = rating; // Update rating if provided
      await interaction.save();
    } else {
      await Interaction.create({
        userId,
        hotelName,
        review,
        totalReview,
        rating,
        location,
      });
    }

    res.status(200).json({ message: "Interaction tracked successfully" });
  } catch (error) {
    console.error("Error tracking interaction:", error);
    res.status(500).json({ error: "Failed to track interaction" });
  }
});


// Fetch user-specific recommendations (to be implemented with AI model)
router.get("/suggestions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch interactions for training
    const interactions = await Interaction.find({ userId }).lean();

    res.json(interactions); // Send this data to the AI model for recommendations
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
