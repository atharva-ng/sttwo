const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/tokenAuth");


const communityCommControllerNotices = require("../controllers/communityCommunicationControllers-notices");
const communityCommControllerComplaints = require("../controllers/communityCommunicationControllers-complaints");

const router = express.Router();

router.use(checkAuth);

router.get('/notices', communityCommControllerNotices.getNotices);
router.get('/notices/:active?', communityCommControllerNotices.getNotices);

router.patch('/notices/:id', communityCommControllerNotices.updateNotice);

router.post('/notices',[
    check('title').trim().not().isEmpty().withMessage('Title cannot be empty').escape(),
    check('content').trim().not().isEmpty().withMessage('Content cannot be empty').escape(),
    check('start_date').trim().not().isEmpty().withMessage('Start Date cannot be empty').isDate().withMessage('Start Date must be a valid date').escape(),
    check('end_date').trim().not().isEmpty().withMessage('End Date cannot be empty').isDate().withMessage('End Date must be a valid date').escape(),
  ],communityCommControllerNotices.createNotice );

router.delete('/notices/:id', communityCommControllerNotices.deleteNotice);

router.get('/complaints', communityCommControllerComplaints.getComplaints);
router.post('/complaints', communityCommControllerComplaints.createComplaint);

router.delete('/complaints/:id', communityCommControllerComplaints.deleteComplaint);

// router.post('/comments', communityCommControllerComplaints.)


module.exports = router;