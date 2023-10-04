const validate = require('../../middlewares/validate')
const { userService } = require('../../services')
const catchAsync = require('../../utils/catchAsync')
const { userValidation } = require('../../validations')

const logout = catchAsync(async (req, res) => {
  req.logOut()
  res.redirect('/login')
})

const register = catchAsync(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const responsedValidate = validate(userValidation.createUser, 'views')(req, res, next)

  const fields = {
    layout: 'layouts/public',
    errors: [],
    success_msg: '',
    name,
    username,
    email,
    password
  }

  if (typeof responsedValidate !== 'undefined') {
    fields.errors.push(...responsedValidate)
    return res.render('pages/register', fields)
  }

  const existingEmail = await userService.getUserByEmail(email);
  if (existingEmail) {
    fields.errors.push("Email already taken");
    return res.render('pages/register', fields)
  }

  const existingUser = await userService.getUserByUsername(username);
  if (existingUser) {
    fields.errors.push("Username already taken");
    return res.render('pages/register', fields)
  }

  await userService.createUser(req.body);

  fields.success_msg = "Register Succesfully"
  res.render('pages/register', {
    ...fields,
    name: '',
    email: '',
    username: '',
    password: ''
  })
})

module.exports = {
  logout,
  register
}
