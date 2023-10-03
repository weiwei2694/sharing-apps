const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation, userValidation } = require('../../validations');
const { authController, userController } = require('../../controllers');

const router = express.Router();

router.post('/register', validate(userValidation.createUser, 'api'), userController.createUser);
router.post('/login', validate(authValidation.login, 'api'), authController.login);
router.post('/logout', validate(authValidation.logout, 'api'), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens, 'api'), authController.refreshTokens);

module.exports = router;
