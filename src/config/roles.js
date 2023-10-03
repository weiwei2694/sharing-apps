const allRoles = {
  user: ['updateUser', 'getUser', 'createPost', 'getPost', 'deletePost'],
  admin: [
    'getUsers',
    'manageUsers',
    'updateUser',
    'getUser',
    'getPosts',
    'createPost',
    'getPost',
    'deletePost',
    'manageCategory',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
