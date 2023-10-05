const express = require('express');
const authRoute = require('./auth.route');
const homeRoute = require('./home.route');
const userRoute = require('./user.route');
const postsRoute = require('./post.route');
const categoryRoute = require('./category.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: authRoute,
  },
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/post',
    route: postsRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
