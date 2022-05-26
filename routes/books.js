const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

//fetching all books
router.get('/books', bookController.getBooks);

//creating book
router.post('/book', bookController.createBook);

//getting a particular book
router.get('/book/:bookId', bookController.getBook);

//updating a particular book
router.put('/book/:bookId', bookController.updateBook);

//deleting a particular book
router.delete('/book/:bookId', bookController.deleteBook);

module.exports = router;