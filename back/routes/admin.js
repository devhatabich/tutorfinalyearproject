const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const { adminAuth } = require('../authentication/adminAuth');
const AdminController = require('../controller/admin');

router.use(Authentication.auth, adminAuth);

router.get('/stats', AdminController.getStats);
router.get('/users', AdminController.getAllUsers);
router.get('/posts', AdminController.getAllPosts);
router.delete('/posts/:postId', AdminController.deletePost);
router.get('/reports', AdminController.getReports);
router.put('/reports/:id/read', AdminController.markReportRead);
router.put('/reports/:id/reviewed', AdminController.markReportReviewed);
router.delete('/user/:userId/freeze', AdminController.freezeUser);

module.exports = router;
