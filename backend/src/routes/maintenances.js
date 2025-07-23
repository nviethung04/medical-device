const express = require('express');
const router = express.Router();

// GET /api/maintenances
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            data: [],
            message: 'Maintenances retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve maintenances',
            error: error.message
        });
    }
});

module.exports = router;
