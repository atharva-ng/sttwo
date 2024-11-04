const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/tokenAuth");


const communityCommControllerNotices = require("../controllers/communityCommunicationControllers-notices");
const communityCommControllerComplaints = require("../controllers/communityCommunicationControllers-complaints");

const router = express.Router();

router.use(checkAuth);

router.get('/notices', communityCommControllerNotices.getNotices);
router.post('/notices',[
    check('title').trim().not().isEmpty().withMessage('Title cannot be empty').escape(),
    check('content').trim().not().isEmpty().withMessage('Content cannot be empty').escape(),
    check('start_date').trim().not().isEmpty().withMessage('Start Date cannot be empty').isDate().withMessage('Start Date must be a valid date').escape(),
    check('end_date').trim().not().isEmpty().withMessage('End Date cannot be empty').isDate().withMessage('End Date must be a valid date').escape(),
    check('categoryId').trim().not().isEmpty().withMessage('Category ID cannot be empty').isNumeric().withMessage('Category ID must be a number').escape(),   
  ],communityCommControllerNotices.createNotice );
router.patch('/notices/:id', communityCommControllerNotices.updateNotice);
router.delete('/notices/:id', communityCommControllerNotices.deleteNotice);

router.get('/complaints/comments',[
  check('complaint_id').trim().not().isEmpty().withMessage('Complaint ID cannot be empty').isNumeric().withMessage('Complaint ID must be a number').escape()
],communityCommControllerComplaints.getComments);
router.post('/complaints/comments',[
  check('complaint_id').trim().not().isEmpty().withMessage('Complaint ID cannot be empty').isNumeric().withMessage('Complaint ID must be a number').escape(),
  check('content').trim().not().isEmpty().withMessage('Content cannot be empty').escape()
], communityCommControllerComplaints.createComment);
// router.patch('/complaints/comments', communityCommControllerComplaints.updateComment);
router.delete('/complaints/comments',[
  check('complaint_id').trim().not().isEmpty().withMessage('Complaint ID cannot be empty').isNumeric().withMessage('Complaint ID must be a number'). escape(),
  check('comment_id').trim().not().isEmpty().withMessage('Comment ID cannot be empty').isNumeric().withMessage('Comment ID must be a number').escape()
], communityCommControllerComplaints.deleteComment);

router.get('/complaints', communityCommControllerComplaints.getComplaints);
router.post('/complaints', communityCommControllerComplaints.createComplaint);
router.patch('/complaints/:id', [
  check('title').trim().not().isEmpty().withMessage('Title cannot be empty').escape(),
  check('description').trim().not().isEmpty().withMessage('Description cannot be empty').escape(),
  check('categoryId').trim().not().isEmpty().withMessage('Category ID cannot be empty').isNumeric().withMessage('Category ID must be a number'). escape()
],communityCommControllerComplaints.updateComplaint);
router.delete('/complaints/:id', communityCommControllerComplaints.deleteComplaint);


module.exports = router;