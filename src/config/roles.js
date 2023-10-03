const allRoles = {
  user: ['updateUser', 'getUser'],
  admin: ['getUsers', 'manageUsers', 'updateUser', 'getUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
