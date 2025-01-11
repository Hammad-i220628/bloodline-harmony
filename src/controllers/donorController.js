const Donor = require('../models/Donor');
const Blood = require('../models/Blood');

const createDonation = async (req, res) => {
  try {
    const { bloodType, units } = req.body;

    let donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      donor = await Donor.create({
        userId: req.user._id,
        bloodType,
        lastDonationDate: new Date(),
        donationCount: 1,
        healthStatus: 'eligible'
      });
    } else {
      donor.lastDonationDate = new Date();
      donor.donationCount += 1;
      await donor.save();
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 42); // Blood expires in 42 days

    const blood = await Blood.create({
      donorId: donor._id,
      bloodType,
      units,
      donationDate: new Date(),
      expiryDate
    });

    res.status(201).json(blood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get donation history
// @route   GET /api/donors/donations
// @access  Private
const getDonationHistory = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const donations = await Blood.find({ donorId: donor._id });
    res.json(donations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Check eligibility
// @route   GET /api/donors/eligibility
// @access  Private
const checkEligibility = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.json({ eligible: true, message: 'First time donor' });
    }

    const lastDonation = donor.lastDonationDate;
    const today = new Date();
    const diffTime = Math.abs(today - lastDonation);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const eligible = diffDays >= 56; // 56 days between donations
    res.json({
      eligible,
      message: eligible ? 'Eligible to donate' : `Must wait ${56 - diffDays} more days`,
      lastDonationDate: lastDonation,
      donationCount: donor.donationCount
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update health status
// @route   PATCH /api/donors/health-status
// @access  Private
const updateHealthStatus = async (req, res) => {
  try {
    const { healthStatus } = req.body;
    let donor = await Donor.findOne({ userId: req.user._id });
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    donor.healthStatus = healthStatus;
    await donor.save();

    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get donation certificates
// @route   GET /api/donors/certificates
// @access  Private
const getDonationCertificates = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const donations = await Blood.find({ donorId: donor._id });
    const certificates = donations.map(donation => ({
      certificateId: donation._id,
      donationDate: donation.donationDate,
      bloodType: donation.bloodType,
      units: donation.units
    }));

    res.json(certificates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDonation,
  getDonationHistory,
  checkEligibility,
  updateHealthStatus,
  getDonationCertificates
};
