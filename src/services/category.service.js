const prisma = require('../../prisma/client');

const createCategory = async (categoryBody) => {
  const { name } = categoryBody;

  return prisma.category.create({
    data: {
      name,
    },
  });
};

const getCategories = async (categoryId) => {
  if (typeof categoryId !== 'undefined') {
    return prisma.category.findUnique({
      where: { id: categoryId },
    });
  }

  return prisma.category.findMany({});
};

const deleteCategory = async (categoryId) => {
  return prisma.category.delete({
    where: { id: categoryId },
  });
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
