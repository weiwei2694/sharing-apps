const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');

const createUser = async (userBody) => {
  const { name, username, email, password } = userBody;

  const hashPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashPassword,
    },
  });
};

const queryUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const updateUserById = async (userId, updateBody) => {
  const { name } = updateBody;

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  return updateUser;
};

const deleteUserById = async (userId) => {
  const deleteUsers = await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  return deleteUsers;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
