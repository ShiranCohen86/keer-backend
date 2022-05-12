const express = require('express');

const { getAvailableRooms, getCouplesRooms } = require('./room.controller');
const router = express.Router();

router.get('/available', getAvailableRooms);
router.get('/couples', getCouplesRooms);

module.exports = router;
