const express = require('express');
const { reportFound, getFoundItems, approveFound } = require('../controllers/foundController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/report', protect, upload.single('image'), reportFound);
router.get('/', protect, getFoundItems);
router.put('/:id/approve', protect, admin, approveFound);

module.exports = router;