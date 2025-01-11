const Blood = require('../models/Blood');

// @desc    View inventory
// @route   GET /api/blood-bank/inventory
// @access  Private/Staff
const getInventory = async (req, res) => {
  try {
    const inventory = await Blood.find()
      .populate('donorId')
      .populate('recipientId');
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add inventory
// @route   POST /api/blood-bank/inventory
// @access  Private/Staff
const addInventory = async (req, res) => {
  try {
    const { donorId, bloodType, units } = req.body;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 42); // Blood expires in 42 days

    const blood = await Blood.create({
      donorId,
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

// @desc    View all requests
// @route   GET /api/blood-bank/requests
// @access  Private/Staff
const getAllRequests = async (req, res) => {
  try {
    const requests = await Blood.find({ status: { $ne: 'available' } })
      .populate('donorId')
      .populate('recipientId');
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Process request
// @route   PATCH /api/blood-bank/requests/:id
// @access  Private/Staff
const processRequest = async (req, res) => {
  try {
    const blood = await Blood.findById(req.params.id);
    if (!blood) {
      return res.status(404).json({ message: 'Request not found' });
    }

    blood.status = req.body.status;
    await blood.save();

    res.json(blood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getInventory,
  addInventory,
  getAllRequests,
  processRequest
};