const express = require('express');
const router = express.Router();

// GET /api/notifications
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            data: [],
            message: 'Notifications retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve notifications',
            error: error.message
        });
    }
});

module.exports = router;
