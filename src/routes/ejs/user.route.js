const express = require('express');
const { viewController, userController } = require('../../controllers/views');
const { checkAuthenticated } = require('../../middlewares/auth.local');

const { getUsernameProfile, getUsernameProfileEdit } = viewController;
const { updateUser } = userController;

const router = express.Router();

router.get('/:username', checkAuthenticated, getUsernameProfile);
router.put('/:userId', checkAuthenticated, updateUser);
router.get('/:username/edit-profile', checkAuthenticated, getUsernameProfileEdit);

module.exports = router;
