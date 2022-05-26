const Book = require('../models/book');

//Fetching books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      message: 'Fetched Books Successfully!!',
      books: books
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Creating book 
exports.createBook = async (req, res, next) => {
  const bookID = req.body.bookID;
  const title = req.body.title;
  const authors = req.body.authors;
  const average_rating = req.body.average_rating;
  const isbn = req.body.isbn;
  const isbn13 = req.body.isbn13;
  const language_code = req.body.language_code;
  const num_pages = req.body.num_pages;
  const ratings_count = req.body.ratings_count;
  const text_reviews_count = req.body.text_reviews_count;
  const publication_date = req.body.publication_date;
  const publisher = req.body.publisher;
  try {
    const book = new Book({
      bookID: bookID,
      title: title,
      authors: authors,
      average_rating: average_rating,
      isbn: isbn,
      isbn13: isbn13,
      language_code: language_code,
      num_pages: num_pages,
      ratings_count: ratings_count,
      text_reviews_count: text_reviews_count,
      publication_date: publication_date,
      publisher: publisher,
    })

    await book.save();
    const books = await Book.find();
    res.status(201).json({
      message: 'Book Added successfully!',
      books: books,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Getting info about single book
exports.getBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error('Could not find Book.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Book fetched.', book: book });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


//Updating the book info
exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const bookID = req.body.bookID
  const title = req.body.title;
  const authors = req.body.authors;
  const average_rating = req.body.average_rating;
  const isbn = req.body.isbn;
  const isbn13 = req.body.isbn13;
  const language_code = req.body.language_code;
  const num_pages = req.body.num_pages;
  const ratings_count = req.body.ratings_count;
  const text_reviews_count = req.body.text_reviews_count;
  const publication_date = req.body.publication_date;
  const publisher = req.body.publisher;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error('Could not find Book.');
      error.statusCode = 404;
      throw error;
    }
    book.bookID = bookID;
    book.title = title;
    book.authors = authors;
    book.average_rating = average_rating;
    book.isbn = isbn;
    book.isbn13 = isbn13;
    book.language_code = language_code;
    book.num_pages = num_pages;
    book.ratings_count = ratings_count;
    book.text_reviews_count = text_reviews_count;
    book.publication_date = publication_date;
    book.publisher = publisher;
    const result = await book.save();
    res.status(200).json({ message: 'Post updated!', post: result });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


//Deleting Book from DB
//Deleting but taking time
exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      const error = new Error('Could not find book.');
      error.statusCode = 404;
      throw error;
    }
    const result = await Book.deleteOne(book);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
