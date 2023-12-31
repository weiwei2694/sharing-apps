const prisma = require('../../prisma/client');

const createCategory = async (categoryBody) => {
  const { name } = categoryBody;

  return prisma.category.create({
    data: {
      name,
    },
  });
};

const getCategories = async () => {
  return prisma.category.findMany({
    include: {
      posts: {
        include: {
          category: true,
        },
      },
    },
  });
};

const getCategoryByName = async (name) => {
  if (!name) return;

  return prisma.category.findUnique({
    where: { name },
  });
};

const getCategoryById = async (categoryId) => {
  if (!categoryId) return;

  return prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      posts: {
        include: {
          category: true,
        },
      },
    },
  });
};

const deleteCategory = async (categoryId) => {
  return prisma.category.delete({
    where: { id: categoryId },
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryByName,
  deleteCategory,
  getCategoryById,
};
