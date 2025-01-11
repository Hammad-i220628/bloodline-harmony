const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createDonation,
  getDonationHistory,
  checkEligibility,
  updateHealthStatus,
  getDonationCertificates
} = require('../controllers/donorController');

router.post('/donations', protect, createDonation);
router.get('/donations', protect, getDonationHistory);
router.get('/eligibility', protect, checkEligibility);
router.patch('/health-status', protect, updateHealthStatus);
router.get('/certificates', protect, getDonationCertificates);

module.exports = router;