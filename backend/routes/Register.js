const express = require("express");
const { check } = require("express-validator");

const registerControllers = require("../controllers/registerControllers");

const checkAuth = require("../middlewares/tokenAuth");

const router = express.Router();

router.use(checkAuth);

router.get('/', registerControllers.getRegisterSociety);

router.post('/', registerControllers.postRegisterSociety);

module.exports = router;