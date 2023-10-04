const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required().max(30),
  }),
};

const getCategories = {
  params: Joi.object().keys({
    categoryId: Joi.string().optional().custom(objectId),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
