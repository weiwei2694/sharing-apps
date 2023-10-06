const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers/api');

const router = express.Router();

router
  .route('/')
  .get(auth('manageCategory'), categoryController.getCategories)
  .post(auth('manageCategory'), validate(categoryValidation.createCategory, 'api'), categoryController.createCategory);

router
  .route('/:categoryId')
  .get(auth('manageCategory'), validate(categoryValidation.getCategory, 'api'), categoryController.getCategory)
  .delete(auth('manageCategory'), validate(categoryValidation.deleteCategory, 'api'), categoryController.deleteCategory);

module.exports = router;
