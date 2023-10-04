const httpStatus = require('http-status');
const { postService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const existingPost = await postService.getPost(postId);
  if (!existingPost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const isAdmin = req.user.role === 'admin';
  const { userId } = existingPost;
  const isSameUserId = req.user.id === userId;

  if (!isAdmin && !isSameUserId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  await postService.deletePost(postId);

  req.session.success_msg = 'Post successfully deleted';
  res.redirect('/');
});

module.exports = {
  deletePost,
};
