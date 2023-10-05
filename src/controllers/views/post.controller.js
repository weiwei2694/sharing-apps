const validate = require('../../middlewares/validate');
const { postService, categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const { postValidation } = require('../../validations');

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const existingPost = await postService.getPost(postId);
  if (!existingPost) {
    return res.redirect('/');
  }

  await postService.deletePost(postId);
  req.session.success_msg = 'Post successfully deleted';
  res.redirect('/');
});

const createPost = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  req.body = {
    ...req.body,
    userId,
  };

  const categories = await categoryService.getCategories();

  const fields = {
    layout: 'layouts/protect',
    errors: [],
    currentUserUsername: req.user.username,
    categories,
  };

  const responsedValidate = validate(postValidation.createPost, 'views')(req, res, next);

  if (typeof responsedValidate !== 'undefined') {
    fields.errors.push(...responsedValidate);
    return res.render('pages/create-post', fields);
  }

  await postService.createPost(req.body);

  res.redirect('/');
});

module.exports = {
  deletePost,
  createPost,
};
