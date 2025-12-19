const FoundItem = require('../models/FoundItem');
const LostItem = require('../models/LostItem');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Report found item
const reportFound = async (req, res) => {
  const { name, description, location } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    const item = new FoundItem({ userId: req.user.id, name, description, imageUrl, location });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all found items (approved for users, all for admin)
const getFoundItems = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { status: 'approved' };
  const items = await FoundItem.find(filter).populate('userId', 'email phone').populate('matchedLostId');
  res.json(items);
};

// Approve found item (admin), match to lostId if provided, send email to finder
const approveFound = async (req, res) => {
  const { id } = req.params;
  const { matchedLostId } = req.body; // Optional
  const update = { status: 'approved' };
  if (matchedLostId) {
    update.matchedLostId = matchedLostId;
    await LostItem.findByIdAndUpdate(matchedLostId, { status: 'found', foundDetails: id });
  }
  const item = await FoundItem.findByIdAndUpdate(id, update, { new: true }).populate('userId');
  // Send email to finder
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: item.userId.email,
    subject: 'Your Found Item Approved',
    text: `Your found item "${item.name}" has been approved${matchedLostId ? ' and matched to a lost item.' : ''}.`,
  });
  res.json(item);
};

module.exports = { reportFound, getFoundItems, approveFound };