const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { categoryService } = require('../../services');

const getCategories = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await categoryService.getCategories(categoryId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Categories Success',
    data: result,
  });
});

const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;

  const existingCategory = await categoryService.getCategoryByName(name);

  if (existingCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  const category = await categoryService.createCategory(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Category Success',
    data: category,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const existingCategory = await categoryService.getCategories(categoryId);
  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  await categoryService.deleteCategory(categoryId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
