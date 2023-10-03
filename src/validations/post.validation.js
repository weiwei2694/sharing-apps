const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required().max(50),
    body: Joi.string().required(),
    firstCategory: Joi.string().optional(),
    secondCategory: Joi.string().optional(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    postId: Joi.string().optional().custom(objectId),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  getPost,
};
