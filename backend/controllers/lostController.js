const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// Report lost item
const reportLost = async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    const item = new LostItem({ userId: req.user.id, name, description, imageUrl });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all lost items (approved for users, all for admin)
const getLostItems = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { status: 'approved' };
  const items = await LostItem.find(filter).populate('userId', 'email phone').populate('foundDetails');
  res.json(items);
};

// Approve lost item (admin)
const approveLost = async (req, res) => {
  const { id } = req.params;
  const item = await LostItem.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  res.json(item);
};

// Mark as collected (lost user only)
const markCollected = async (req, res) => {
  const { id } = req.params;
  const item = await LostItem.findOneAndUpdate({ _id: id, userId: req.user.id }, { status: 'collected' }, { new: true });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

module.exports = { reportLost, getLostItems, approveLost, markCollected };