import express from 'express';
import BookController from '../controllers/book';
import HelperController from '../helpers/helpers';
const router = express.Router();

router.get(
    '/get/all/books',
    HelperController.validate,
    BookController.getAllBooks
);
router.post(
    '/create/book',
    HelperController.validate,
    BookController.createBook
);

export default router
