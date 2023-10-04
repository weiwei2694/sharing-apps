const catchAsync = require('../../utils/catchAsync');
const { userService, postService, categoryService } = require('../../services');

const getHome = catchAsync(async (req, res) => {
  const posts = await postService.getPosts();

  res.render('pages/home', {
    layout: 'layouts/protect',
    user: req.user,
    currentUserUsername: req.user.username,
    posts,
  });
});

const getUsernameProfile = catchAsync(async (req, res) => {
  const { username } = req.params;

  const currentUser = await userService.getUserByUsername(username);
  if (!currentUser) {
    return res.render('pages/404', {
      layout: 'layouts/protect',
      currentUserUsername: req.user.username,
    });
  }

  const posts = await postService.getPosts(currentUser.id);

  const fields = {
    layout: 'layouts/protect',
    enabledEditing: true,
    user: currentUser,
    currentUserUsername: req.user.username,
    posts,
  };

  const isSameUserId = currentUser.id === req.user.id;
  if (!isSameUserId) {
    fields.enabledEditing = false;
    return res.render('pages/profile', fields);
  }

  res.render('pages/profile', fields);
});

const getUsernameProfileEdit = catchAsync(async (req, res) => {
  const { username } = req.params;

  const currentUser = await userService.getUserByUsername(username);
  if (!currentUser) {
    return res.render(`pages/404`, {
      layout: 'layouts/protect',
      currentUserUsername: req.user.username,
    });
  }

  const isSameUserId = currentUser.id === req.user.id;
  if (!isSameUserId) {
    return res.redirect(`/user/${req.user.username}`);
  }

  res.render('pages/edit-profile', {
    layout: 'layouts/protect',
    user: req.user,
    currentUserUsername: req.user.username,
  });
});

const getPostCreate = catchAsync(async (req, res) => {
  res.render('pages/create-post', {
    user: req.user,
  });
});

const getPostDetailPost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const dataPost = await postService.getPost(postId);

  const fields = {
    layout: 'layouts/protect',
    post: dataPost,
    enableDelete: true,
    user: req.user,
    currentUserUsername: req.user.username,
  };

  if (!dataPost) {
    return res.render('pages/404', {
      layout: 'layouts/protect',
      currentUserUsername: req.user.username,
    });
  }

  if (dataPost.userId !== req.user.id) {
    fields.enableDelete = false;
    return res.render('pages/detail-post', fields);
  }

  res.render('pages/detail-post', fields);
});

const getCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();

  res.render('pages/categories', {
    categories,
  });
});

const getCategoryCreate = catchAsync(async (req, res) => {
  res.render('pages/create-category', {
    user: req.user,
  });
});

const getLogin = catchAsync(async (req, res) => {
  res.render('pages/login', {
    layout: 'layouts/public',
  });
});

const getRegister = catchAsync(async (req, res) => {
  res.render('pages/register', {
    layout: 'layouts/public',
  });
});

module.exports = {
  getHome,
  getUsernameProfile,
  getUsernameProfileEdit,
  getPostCreate,
  getPostDetailPost,
  getCategory,
  getCategoryCreate,
  getLogin,
  getRegister,
};
