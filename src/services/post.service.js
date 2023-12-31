const categoryService = require('./category.service');
const prisma = require('../../prisma/client');

const createPost = async (postBody) => {
  const { userId, title, body, firstCategory, secondCategory } = postBody;

  const postData = {
    userId,
    title,
    body,
  };

  const firstCategoryData = await categoryService.getCategoryById(firstCategory);
  const secondCategoryData = await categoryService.getCategoryById(secondCategory);

  if (firstCategoryData && secondCategoryData) {
    postData.category = {
      connect: [{ id: firstCategory }, { id: secondCategory }],
    };
  } else if (firstCategoryData) {
    postData.category = {
      connect: { id: firstCategory },
    };
  } else if (secondCategoryData) {
    postData.category = {
      connect: { id: secondCategory },
    };
  }

  return prisma.post.create({
    data: postData,
  });
};

const deletePost = async (postId) => {
  return prisma.post.delete({
    where: { id: postId },
  });
};

const getPosts = async () => {
  return prisma.post.findMany({
    include: {
      category: true,
      user: true,
    },
  });
};

const getPost = async (postId) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      category: true,
      user: true,
    },
  });
};

const getPostsByCategory = async (categoryName) => {
  if (!categoryName) return;

  return prisma.category.findFirst({
    where: { name: categoryName },
    include: {
      posts: {
        include: {
          category: true,
          user: true,
        },
      },
    },
  });
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  deletePost,
  getPostsByCategory,
};
