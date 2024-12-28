const mongoose = require("mongoose");

const InteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelName: { type: String, required: true },
  review: { type: String, required: true },
  totalReview: { type: Number, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  interactionCount: { type: Number, default: 1 },
});

module.exports = mongoose.model("Interaction", InteractionSchema);
