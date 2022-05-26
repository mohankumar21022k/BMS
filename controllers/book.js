const Book = require('../models/book');

//for fetching books
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

//for creating book 
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
    bookID:bookID,
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
      message: 'Book Addes successfully!',
      books: books,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
