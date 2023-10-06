const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { authService, tokenService } = require('../../services');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  login,
  logout,
};
