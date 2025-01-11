const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient'
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'used', 'expired'],
    default: 'available'
  },
  donationDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blood', bloodSchema);