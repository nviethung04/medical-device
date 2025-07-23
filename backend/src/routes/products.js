const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            data: [],
            message: 'Products retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
            error: error.message
        });
    }
});

// POST /api/products
router.post('/', async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            data: req.body,
            message: 'Product created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message
        });
    }
});

module.exports = router;
