import express from 'express';
import CategoryController from '../controllers/categories';
import HelperController from '../helpers/helpers';
const router = express.Router();

router.get(
    '/get/all/categories',
    HelperController.validate,
    CategoryController.getAllCategories
);
router.post(
    '/create/category',
    HelperController.validate,
    CategoryController.createCategory
);
router.put(
    '/edit/category',
    HelperController.validate,
    CategoryController.editCategory
);
router.delete(
    '/delete/category/:id',
    HelperController.validate,
    CategoryController.deleteCategory
)
export default router
