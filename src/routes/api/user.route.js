const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const { userController } = require('../../controllers');

const router = express.Router();

router.get('/', auth('getUsers'), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUser'), validate(userValidation.getUser, 'api'), userController.getUser)
  .put(auth('updateUser'), validate(userValidation.updateUser, 'api'), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser, 'api'), userController.deleteUser);

module.exports = router;
