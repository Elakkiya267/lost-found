const express = require('express');
const { reportLost, getLostItems, approveLost, markCollected } = require('../controllers/lostController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/report', protect, upload.single('image'), reportLost);
router.get('/', protect, getLostItems);
router.put('/:id/approve', protect, admin, approveLost);
router.put('/:id/collected', protect, markCollected);

module.exports = router;