const express = require("express");
const multer = require('multer');
const path = require('path');

const checkAuth = require("../middlewares/tokenAuth");

const ownersModuleController = require("../controllers/ownersModuleControllers");

const router = express.Router();

const upload = multer({ dest: 'uploads/', });

router.use(checkAuth);

router.get('/', ownersModuleController.getOwnersData);

router.get('/get-excel', ownersModuleController.getOwnersModuleExcel);

router.post('/post-excel', upload.single('excel'), ownersModuleController.postOwnersModuleExcel);

module.exports = router;