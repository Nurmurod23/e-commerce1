const express = require('express');
const { getDashboard, manageProducts, manageUsers, manageOrders } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const rateLimit = require('../middleware/rateLimitMiddleware'); // Optional: Rate limiting
const router = express.Router();

router.use(rateLimit);

router.get('/dashboard', protect, admin, getDashboard);
router.get('/products', protect, admin, manageProducts);
router.get('/users', protect, admin, manageUsers);
router.get('/orders', protect, admin, manageOrders);

module.exports = router;
