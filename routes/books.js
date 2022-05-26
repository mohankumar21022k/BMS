const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.get('/books', bookController.getBooks);

router.post('/book' ,bookController.createBook);
  
// router.get('/book/:bookID', bookController.getBook);

// router.put('/book/:bookID',bookController.updateBook);

// router.delete('/post/:postId', bookController.deleteBook);

module.exports = router;