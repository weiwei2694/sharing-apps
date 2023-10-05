const validate = require('../../middlewares/validate');
const { categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const { categoryValidation } = require('../../validations');

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const existingCategory = await categoryService.getCategories(categoryId);
  if (!existingCategory) {
    return res.redirect('/category');
  }

  await categoryService.deleteCategory(categoryId);

  res.redirect('/category');
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const fields = {
    layout: 'layouts/admin',
    errors: [],
    currentUserUsername: req.user.username,
  };

  const responsedValidate = validate(categoryValidation.createCategory, 'views')(req, res, next);

  if (typeof responsedValidate !== 'undefined') {
    fields.errors.push(...responsedValidate);
    return res.render('pages/create-category', fields);
  }

  const existingCategory = await categoryService.getCategoryByName(name);

  if (existingCategory) {
    fields.errors.push('Name already taken');
    return res.render('pages/create-category', fields);
  }

  await categoryService.createCategory(req.body);

  res.redirect('/category');
});

module.exports = {
  deleteCategory,
  createCategory,
};
