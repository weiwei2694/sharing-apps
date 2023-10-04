const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers/api');

const router = express.Router();

router
  .route('/')
  .get(auth('manageCategory'), validate(categoryValidation.getCategories, 'api'), categoryController.getCategories)
  .post(auth('manageCategory'), validate(categoryValidation.createCategory, 'api'), categoryController.createCategory);

router.delete(
  '/:categoryId',
  auth('manageCategory'),
  validate(categoryValidation.deleteCategory, 'api'),
  categoryController.deleteCategory
);

module.exports = router;
