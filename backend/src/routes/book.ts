import express from 'express';
import BookController from '../controllers/book';
import HelperController from '../helpers/helpers';
import multer from 'multer';
import path from  'path'
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage })

router.get(
    '/get/all/books',
    HelperController.validate,
    BookController.getAllBooks
);
router.post(
    '/create/book',
    HelperController.validate,
    upload.single('bookImage'),
    BookController.createBook
);
router.delete(
  '/delete/book/:id',
  HelperController.validate,
  BookController.deleteBook
)
router.get(
  '/get/book/:slug',
  BookController.getBookDetails
)

export default router
