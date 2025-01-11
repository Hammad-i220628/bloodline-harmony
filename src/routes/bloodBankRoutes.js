const express = require('express');
const router = express.Router();
const { protect, staff } = require('../middleware/auth');
const {
  getInventory,
  addInventory,
  getAllRequests,
  processRequest,
  deleteInventory,
  updateInventoryStatus
} = require('../controllers/bloodBankController');

router.get('/inventory', protect, staff, getInventory);
router.post('/inventory', protect, staff, addInventory);
router.delete('/inventory/:id', protect, staff, deleteInventory);
router.patch('/inventory/:id/status', protect, staff, updateInventoryStatus);
router.get('/requests', protect, staff, getAllRequests);
router.patch('/requests/:id', protect, staff, processRequest);

module.exports = router;