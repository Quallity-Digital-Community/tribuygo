const express = require('express');
const schoolModel = require('../../models/schools.js');

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'School Works' }));

module.exports = router; 