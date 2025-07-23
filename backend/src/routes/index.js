const express = require('express');
const router = express.Router();

// Import route modules
const usersRouter = require('./users');
const customersRouter = require('./customers');
const productsRouter = require('./products');
const transactionsRouter = require('./transactions');
const notificationsRouter = require('./notifications');
const maintenancesRouter = require('./maintenances');

// API Routes
router.use('/users', usersRouter);
router.use('/customers', customersRouter);
router.use('/products', productsRouter);
router.use('/transactions', transactionsRouter);
router.use('/notifications', notificationsRouter);
router.use('/maintenances', maintenancesRouter);

// API Info
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Medical Devices Management System API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            customers: '/api/customers',
            products: '/api/products',
            transactions: '/api/transactions',
            notifications: '/api/notifications',
            maintenances: '/api/maintenances'
        }
    });
});

module.exports = router;
