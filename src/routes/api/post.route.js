const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const { postController } = require('../../controllers/api');

const router = express.Router();

router
  .route('/')
  .get(auth('getPosts'), postController.getPosts)
  .post(auth('createPost'), validate(postValidation.createPost, 'api'), postController.createPost);

router
  .route('/:postId')
  .get(auth('getPost'), validate(postValidation.getPost, 'api'), postController.getPost)
  .delete(auth('deletePost'), validate(postValidation.deletePost, 'api'), postController.deletePost);

module.exports = router;
