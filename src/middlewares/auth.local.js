const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};

const adminRoleLocal = (req, res, next) => {
  if (req.user.role === 'admin') return next();

  res.redirect('/');
};

module.exports = {
  adminRoleLocal,
  checkAuthenticated,
  checkNotAuthenticated,
};
