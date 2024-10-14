const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middlewares/tokenAuth");

const communityCommunicationModuleController = require("../controllers/communityCommunicationControllers");

const router = express.Router();

router.use(checkAuth);

router.get('/notices', communityCommunicationModuleController.getNotices);
router.get('/notices/:active?', communityCommunicationModuleController.getNotices);

router.patch('/notices/:id', communityCommunicationModuleController.updateNotice);

router.post('/notices',[
    check('title').trim().not().isEmpty().withMessage('Title cannot be empty').escape(),
    check('content').trim().not().isEmpty().withMessage('Content cannot be empty').escape(),
    check('start_date').trim().not().isEmpty().withMessage('Start Date cannot be empty').isDate().withMessage('Start Date must be a valid date').escape(),
    check('end_date').trim().not().isEmpty().withMessage('End Date cannot be empty').isDate().withMessage('End Date must be a valid date').escape(),
  ],communityCommunicationModuleController.createNotice );

router.delete('/notices/:id', communityCommunicationModuleController.deleteNotice);


module.exports = router;