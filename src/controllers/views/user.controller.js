const { userService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');

const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { username, name } = req.body;

  const existingUser = await userService.getUserById(userId);
  if (!existingUser) {
    return res.redirect('/');
  }

  const responsedValidate = validate(userValidation.updateUser, 'views')(req, res, next);

  const fields = {
    layout: 'layouts/protect',
    errors: [],
    username,
    name,
    user: req.user,
    currentUserUsername: req.user.username,
  };

  if (typeof responsedValidate !== 'undefined') {
    fields.errors.push(...responsedValidate);
    return res.render('pages/edit-profile', fields);
  }

  if (existingUser.username !== username) {
    const existingUsername = await userService.getUserByUsername(username);
    if (existingUsername) {
      fields.errors.push('Username already taken');
      return res.render('pages/edit-profile', fields);
    }
  }

  await userService.updateUserById(userId, req.body);

  res.redirect(`/user/${username}`);
});

module.exports = {
  updateUser,
};
