const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { postService } = require('../../services');

const getPosts = catchAsync(async (req, res) => {
  const { userId } = req.query.userId;
  const result = await postService.getPosts(userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Users Success',
    data: result,
  });
});

const createPost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const isSameUserId = req.user.id === userId;

  if (!isSameUserId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  const post = await postService.createPost(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Post Success',
    data: post,
  });
});

const getPost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const existingPost = await postService.getPost(postId);

  if (!existingPost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Post Success',
    data: existingPost,
  });
});

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

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Post Success',
    data: null,
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
};
