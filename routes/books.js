const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.get('/books', bookController.getBooks);

router.post('/book' ,bookController.createBook);
  
router.get('/book/:bookId', bookController.getBook);

router.put('/book/:bookId',bookController.updateBook);

router.delete('/book/:bookId', bookController.deleteBook);

module.exports = router;