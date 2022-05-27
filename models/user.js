const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  //hashed password
  password: {
    type: String,
    required: true
  },

  //user/admin
  role: {
    type: String,
    required: true
  },

  // enable/disable
  userAccess: {
    type: Boolean,
    required: true
  },

  //favourite books array
  fav: {
    books: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        }
      }
    ]
  }
});


//adding book to fav
userSchema.methods.addToFav = function(book) {
  const favBookIndex = this.fav.books.findIndex(currentBook => {
    return currentBook.bookId.toString() === book._id.toString();
  });
  const updatedFavBooks = [...this.fav.books];
  if (favBookIndex >= 0) {
   return res.status(200).json('Book already exists in fav')
  } else {
    updatedFavBooks.push({
      book: book._id,  
    });
  }
  const updatedFav = {
    fav: updatedFavBooks
  };
  this.fav = updatedFav;
  return this.save();
};

//removal of a particular book from fav
userSchema.methods.removeFromFav = function(bookId) {
  const updatedFavBooks = this.fav.books.filter(item => {
    return item.bookId.toString() !== bookId.toString();
  });
  this.fav.books = updatedFavBooks;
  return this.save();
};

//clear fav property
userSchema.methods.clearFav = function() {
  this.fav = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);