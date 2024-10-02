const express = require("express");

const checkAuth = require("../middlewares/tokenAuth");

const ownersModuleController = require("../controllers/ownersModuleControllers");

const router = express.Router();


router.use(checkAuth);

router.get('/', ownersModuleController.getOwnersModule);

module.exports = router;