const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createRequest,
  getRequestHistory,
  updateRequest
} = require('../controllers/recipientController');

router.post('/requests', protect, createRequest);
router.get('/requests', protect, getRequestHistory);
router.patch('/requests/:id', protect, updateRequest);

module.exports = router;