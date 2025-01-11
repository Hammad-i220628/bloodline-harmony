const Recipient = require('../models/Recipient');
const Blood = require('../models/Blood');

// @desc    Create blood request
// @route   POST /api/recipients/requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const { bloodType, diagnosis, hospitalName, emergencyContact, units } = req.body;

    let recipient = await Recipient.findOne({ userId: req.user._id });
    if (!recipient) {
      recipient = await Recipient.create({
        userId: req.user._id,
        bloodType,
        diagnosis,
        hospitalName,
        emergencyContact
      });
    }

    // Find available blood
    const blood = await Blood.findOne({
      bloodType,
      status: 'available',
      units: { $gte: units }
    });

    if (!blood) {
      return res.status(404).json({ message: 'Blood not available' });
    }

    blood.status = 'reserved';
    blood.recipientId = recipient._id;
    await blood.save();

    res.status(201).json(blood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get request history
// @route   GET /api/recipients/requests
// @access  Private
const getRequestHistory = async (req, res) => {
  try {
    const recipient = await Recipient.findOne({ userId: req.user._id });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const requests = await Blood.find({ recipientId: recipient._id });
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update request
// @route   PATCH /api/recipients/requests/:id
// @access  Private
const updateRequest = async (req, res) => {
  try {
    const blood = await Blood.findById(req.params.id);
    if (!blood) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const recipient = await Recipient.findOne({ userId: req.user._id });
    if (!recipient || blood.recipientId.toString() !== recipient._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    blood.status = req.body.status;
    await blood.save();

    res.json(blood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequestHistory,
  updateRequest
};