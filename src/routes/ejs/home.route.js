const express = require('express');
const { viewController } = require('../../controllers/views');
const { checkAuthenticated } = require('../../middlewares/auth.local');

const { getHome } = viewController;

const router = express.Router();

router.get('/', checkAuthenticated, getHome);

module.exports = router;
