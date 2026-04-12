const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const ReportController = require('../controller/report');

router.post('/', Authentication.auth, ReportController.createReport);

module.exports = router;
