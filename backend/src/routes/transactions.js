const express = require('express');
const router = express.Router();

// GET /api/transactions
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            data: [],
            message: 'Transactions retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve transactions',
            error: error.message
        });
    }
});

module.exports = router;
