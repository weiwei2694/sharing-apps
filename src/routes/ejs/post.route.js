const express = require('express');
const { checkAuthenticated } = require('../../middlewares/auth.local');
const { viewController, postController } = require('../../controllers/views');

const { getPostCreate, getPostDetailPost } = viewController;
const { createPost, deletePost } = postController;

const router = express.Router();

router.route('/create').get(checkAuthenticated, getPostCreate).post(checkAuthenticated, createPost);
router.route('/:postId').get(checkAuthenticated, getPostDetailPost).delete(checkAuthenticated, deletePost);

module.exports = router;
