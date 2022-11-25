import express from 'express';
import AuthController from '../controllers/auth';
import HelperController from '../helpers/helpers';
const router = express.Router();

router.post(
    '/signup',
    AuthController.signup
);
router.post(
    '/login',
    AuthController.login
);
router.post(
    '/logout',
    HelperController.validate,
    AuthController.logout
);

router.get(
    '/get/all',
    HelperController.validate,
    AuthController.getAllUsers
);
router.delete(
    '/delete/:id',
    HelperController.validate,
    AuthController.deleteUser
);
export default router
