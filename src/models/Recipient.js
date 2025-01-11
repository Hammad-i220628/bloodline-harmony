const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  diagnosis: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  emergencyContact: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipient', recipientSchema);