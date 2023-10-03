const express = require('express');
const { checkAuthenticated, checkNotAuthenticated, adminRoleLocal } = require('../../middlewares/auth.local');

const router = express.Router();

// protect route
router.get('/', checkAuthenticated, (req, res) => {
  res.render('pages/home');
});

router.get('/user/:username', checkAuthenticated, (req, res) => {
  res.render('pages/profile', { username: req.params.username });
});

router.get('/user/:username/edit-profile', checkAuthenticated, (req, res) => {
  res.render('pages/edit-profile', { username: req.params.username });
});

router.get('/post/create', checkAuthenticated, (req, res) => {
  res.render('pages/create-post');
});

router.get('/post/:postId', checkAuthenticated, (req, res) => {
  res.render('pages/detail-post', { postId: req.params.postId });
});

router.get('/category/create', checkAuthenticated, adminRoleLocal, (req, res) => {
  res.render('pages/create-category');
});

// Unprotect Route
router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('pages/login');
});
router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('pages/register');
});

module.exports = router;
