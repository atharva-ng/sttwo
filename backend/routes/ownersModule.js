const express = require("express");
const multer = require('multer');

const checkAuth = require("../middlewares/tokenAuth");

const ownersModuleController = require("../controllers/ownersModuleControllers");

const router = express.Router();

const upload = multer({ dest: 'uploads/', });

router.use(checkAuth);

router.get('/', ownersModuleController.getOwnersData);

router.get('/get-excel', ownersModuleController.getOwnersModuleExcel);

router.post('/post-excel', upload.single('file'), ownersModuleController.postOwnersModuleExcel);

module.exports = router;