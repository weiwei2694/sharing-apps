const express = require('express');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated, adminRoleLocal } = require('../../middlewares/auth.local');
const { viewController, authController } = require('../../controllers/views/');

const {
  getHome,
  getUsernameProfile,
  getUsernameProfileEdit,
  getCategory,
  getCategoryCreate,
  getPostDetailPost,
  getPostCreate,
  getLogin,
  getRegister,
} = viewController;
const { register, logout } = authController;

const router = express.Router();

// protect route
router.get('/', checkAuthenticated, getHome);
router.get('/user/:username', checkAuthenticated, getUsernameProfile);
router.get('/user/:username/edit-profile', checkAuthenticated, getUsernameProfileEdit);
router.get('/post/create', checkAuthenticated, getPostCreate);
router.get('/post/:postId', checkAuthenticated, getPostDetailPost);
// admin route
router.get('/category', checkAuthenticated, adminRoleLocal, getCategory);
router.get('/category/create', checkAuthenticated, adminRoleLocal, getCategoryCreate);

// Unprotect Route
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
router
  .route('/register')
  .get(checkNotAuthenticated, getRegister)
  .post(checkNotAuthenticated, register);

module.exports = router;
