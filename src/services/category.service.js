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
      include: {
        posts: {
          include: {
            category: true,
          },
        },
      },
    });
  }

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
  return prisma.category.findUnique({
    where: { name: name },
  });
};

const getCategoryById = async (categoryId) => {
  if (!categoryId) return;

  return prisma.category.findUnique({
    where: { id: categoryId },
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
  getCategoryById
};
