const catchAsync = require('../../utils/catchAsync');
const { userService, postService, categoryService } = require('../../services');

const getHome = catchAsync(async (req, res) => {
  res.render('pages/home', {
    layout: 'layouts/protect',
    user: req.user,
  });
});

const getUsernameProfile = catchAsync(async (req, res) => {
  const username = req.params.username;

  const currentUser = await userService.getUserByUsername(username);
  if (!currentUser) {
    return res.render('pages/404', {
      layout: "layouts/protect",
    });
  }

  const isSameUserId = currentUser.id === req.user.id;
  if (!isSameUserId) {
    return res.render('pages/profile', {
      layout: "layouts/protect",
      enableEditing: false,
      user: currentUser,
    });
  }

  res.render('pages/profile', {
    layout: "layouts/protect",
    user: req.user,
    enableEditing: true,
  });
});

const getUsernameProfileEdit = catchAsync(async (req, res) => {
  const username = req.params.username;

  const currentUser = await userService.getUserByUsername(username);
  if (!currentUser) {
    return res.redirect(`pages/404`);
  }

  const isSameUserId = currentUser.id === req.user.id;
  if (!isSameUserId) {
    return res.redirect(`/user/${req.user.username}`)
  }

  res.render('pages/edit-profile', {
    user: req.user,
  });
});

const getPostCreate = catchAsync(async (req, res) => {
  res.render('pages/create-post', {
    user: req.user
  })
})

const getPostDetailPost = catchAsync(async (req, res) => {
  const postId = req.params.postId
  const dataPost = await postService.getPost(postId)

  if (dataPost.userId !== req.user.id) {
    return res.render('pages/detail-post', {
      post: dataPost,
      enableDelete: false,
    })
  }

  res.render('pages/detail-post', {
    post: dataPost,
    enableDelete: true,
  })
})

const getCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories()

  res.render('pages/categories', {
    categories
  })
})

const getCategoryCreate = catchAsync(async (req, res) => {
  res.render('pages/create-category', {
    user: req.user
  })
})

const getLogin = catchAsync(async (req, res) => {
  res.render('pages/login', {
    layout: 'layouts/public'
  })
})

const getRegister = catchAsync(async (req, res) => {
  res.render('pages/register', {
    layout: 'layouts/public'
  })
})

module.exports = {
  getHome,
  getUsernameProfile,
  getUsernameProfileEdit,
  getPostCreate,
  getPostDetailPost,
  getCategory,
  getCategoryCreate,
  getLogin,
  getRegister
}
