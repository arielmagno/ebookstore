var mongoose = require('mongoose');

//Create schema for books 
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    pages: {
        type: String
    },
    image_url: {
        type: String
    },
    buy_url: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

//ready for export 
var Book = module.exports = mongoose.model('Book', bookSchema);

//retrieve books 
module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit();
}

module.exports.getBookByID = function (id, callback) {
    Book.findById(id, callback);
}

module.exports.addBook = function (book, callback) {
    Book.create(book, callback);
}

module.exports.updateBook = function (id, book, options, callback) {
    var query = { _id: id };
    var update = {
        title: book.title, 
        description : book.description, 
        author: book.author, 
        genre: book.genre, 
        publisher: book.publisher, 
        pages: book.pages, 
        image_url : book.image_url, 
        buy_url: book.buy_url
    }
    Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBook = function(id, callback){
    var id = {_id:id}; 
    Book.remove(id, callback);
}

