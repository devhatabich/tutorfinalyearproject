const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const MeetingController = require('../controller/meeting');

router.post('/', Authentication.auth, MeetingController.createMeeting);
router.get('/', Authentication.auth, MeetingController.getMeetings);
router.delete('/:id', Authentication.auth, MeetingController.deleteMeeting);
router.post('/:id/rate', Authentication.auth, MeetingController.rateMeeting);

module.exports = router;
