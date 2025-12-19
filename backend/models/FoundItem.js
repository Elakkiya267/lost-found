const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  matchedLostId: { type: mongoose.Schema.Types.ObjectId, ref: 'LostItem' },
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);