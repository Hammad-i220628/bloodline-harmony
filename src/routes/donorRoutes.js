const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createDonation,
  getDonationHistory,
  checkEligibility
} = require('../controllers/donorController');

router.post('/donations', protect, createDonation);
router.get('/donations', protect, getDonationHistory);
router.get('/eligibility', protect, checkEligibility);

module.exports = router;