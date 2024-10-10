const express = require("express");

const checkAuth = require("../middlewares/tokenAuth");

const communityCommunicationModuleController = require("../controllers/communityCommunicationControllers");

const router = express.Router();

router.use(checkAuth);

router.get('/', ()=>{});

module.exports = router;