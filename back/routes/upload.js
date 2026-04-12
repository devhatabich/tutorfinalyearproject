const express = require('express');
const router = express.Router();
const UploadController = require('../controller/upload');
const Authentication = require('../authentication/auth');

router.get('/presign', Authentication.auth, UploadController.getPresignedUrl);

module.exports = router;
