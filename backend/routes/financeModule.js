const express = require("express");

const checkAuth = require("../middlewares/tokenAuth");

const financeModuleControllers = require("../controllers/financeModuleControllers");

const router = express.Router();


router.use(checkAuth);

router.get('/', financeModuleControllers.getTransactions);

module.exports = router;