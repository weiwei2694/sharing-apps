const prisma = require('../../prisma/client');

const createPost = async (postBody) => {
  const { userId, title, body, firstCategory, secondCategory } = postBody;

  return prisma.post.create({
    data: {
      userId,
      title,
      body,
      // category: {
      //   connect: [{ id: firstCategory }, { id: secondCategory }],
      // },
    },
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

  return prisma.post.findMany();
};

const getPost = async (postId) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      category: true,
    },
  });
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  deletePost,
};
