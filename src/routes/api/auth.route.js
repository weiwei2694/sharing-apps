const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation, userValidation } = require('../../validations');
const { authController, userController } = require('../../controllers/api');

const router = express.Router();

router.post('/register', validate(userValidation.createUser, 'api'), userController.createUser);
router.post('/login', validate(authValidation.login, 'api'), authController.login);
router.post('/logout', validate(authValidation.logout, 'api'), authController.logout);

module.exports = router;
