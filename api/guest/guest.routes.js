const express = require('express');

const { getGuestFamilies } = require('./guest.controller');
const router = express.Router();

router.get('/families', getGuestFamilies);

module.exports = router;
