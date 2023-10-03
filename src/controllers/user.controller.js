const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const { username, email } = req.body;

  const existingEmail = await userService.getUserByEmail(email);
  if (existingEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const existingUser = await userService.getUserByUsername(username);
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  const user = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create User Success',
    data: user,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Users Success',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const existingUser = await userService.getUserById(userId);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isAdmin = req.user.role === 'admin'
  const isSameUserId = req.user.id === userId

  if (!isAdmin && !isSameUserId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get User Success',
    data: existingUser,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { username } = req.body;

  const existingUser = await userService.getUserById(userId);
  if (!existingUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const isAdmin = req.user.role === 'admin'
  const isSameUserId = req.user.id === userId

  if (!isAdmin && !isSameUserId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  if (existingUser.username !== username) {
    const existingUsername = await userService.getUserByUsername(username);
    if (existingUsername) throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  const user = await userService.updateUserById(userId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update User Success',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const existingUser = await userService.getUserById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isAdmin = req.user.role === 'admin'
  const isSameUserId = req.user.id === userId

  if (isAdmin && isSameUserId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
  }

  await userService.deleteUserById(userId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete User Success',
    data: null,
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
