const express = require('express');
const { viewController, categoryController } = require('../../controllers/views');
const { adminRoleLocal, checkAuthenticated } = require('../../middlewares/auth.local');

const { getCategory, getCategoryCreate } = viewController;
const { deleteCategory, createCategory } = categoryController;

const router = express.Router();

router.get('/', checkAuthenticated, adminRoleLocal, getCategory);
router
  .route('/create')
  .get(checkAuthenticated, adminRoleLocal, getCategoryCreate)
  .post(checkAuthenticated, adminRoleLocal, createCategory);
router.delete('/:categoryId', checkAuthenticated, adminRoleLocal, deleteCategory);

module.exports = router;
