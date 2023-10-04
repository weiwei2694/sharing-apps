const { postService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');

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

module.exports = {
  deletePost,
};
