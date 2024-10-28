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


router.get('/complaints', communityCommControllerComplaints.getComplaints);
router.post('/complaints', communityCommControllerComplaints.createComplaint);
router.patch('/complaints/:id', communityCommControllerComplaints.updateComplaint);
router.delete('/complaints/:id', communityCommControllerComplaints.deleteComplaint);



module.exports = router;