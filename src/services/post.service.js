const prisma = require('../../prisma/client');

const createPost = async (postBody) => {
  const { userId, title, body, firstCategory, secondCategory } = postBody;

  const postData = {
    userId,
    title,
    body,
  };

  if (firstCategory && secondCategory) {
    postData.category = {
      connect: [{ id: firstCategory }, { id: secondCategory }],
    };
  } else if (firstCategory) {
    postData.category = {
      connect: { id: firstCategory },
    };
  } else if (secondCategory) {
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

const getPosts = async (userId) => {
  if (userId) {
    const userPosts = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          include: {
            category: true,
          },
        },
      },
    });

    return userPosts.posts;
  }

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

module.exports = {
  createPost,
  getPost,
  getPosts,
  deletePost,
};
