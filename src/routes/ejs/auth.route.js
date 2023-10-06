const express = require('express');
const passport = require('passport');
const { checkNotAuthenticated, checkAuthenticated } = require('../../middlewares/auth.local');
const { viewController, authController } = require('../../controllers/views');

const { getLogin, getRegister } = viewController;
const { register, logout } = authController;

const router = express.Router();

router
  .route('/login')
  .get(checkNotAuthenticated, getLogin)
  .post(
    checkNotAuthenticated,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );
router.delete('/logout', checkAuthenticated, logout);
router.route('/register').get(checkNotAuthenticated, getRegister).post(checkNotAuthenticated, register);

module.exports = router;
