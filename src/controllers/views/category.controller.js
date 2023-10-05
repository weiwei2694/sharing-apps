const { categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const existingCategory = await categoryService.getCategories(categoryId);
  if (!existingCategory) {
    return res.redirect('/category');
  }

  await categoryService.deleteCategory(categoryId);

  res.redirect('/category');
});

module.exports = {
  deleteCategory,
};
