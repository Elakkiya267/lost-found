const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'found', 'collected'], default: 'pending' },
  foundDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'FoundItem' }, // If matched
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);