const express = require('express');

const { sendStatus } = require('./administration.controller');
const router = express.Router();

router.post('/status', sendStatus);

module.exports = router;
