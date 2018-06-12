var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(express.static(__dirname + '/client'));

//initialize middleware for body parser
app.use(bodyParser.json());


Genre = require('./models/genre');
Book = require('./models/book');

//Connect to Mongoose 
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

/* app.get('/', function (req, res) {
    res.send("Please use api/genres or api/books");
});*/

app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

//Add Genre
app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

//Update Genre
app.put('/api/genres/:_id', function (req, res) {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function (err, genre) {
        if (err) {
            throw err;
        }
    });
    res.json(genre);
});

//Delete Genre 
app.delete('/api/genres/:_id', function (req, res) {
    var id = req.params._id;
        Genre.deleteGenre(id, function (err, genre) {
            if(err){
                throw err; 
            }
            res.json(genre);
        });
     
});

app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) { throw err; }
        res.json(books);
    });
});

//Add Book 
app.post('/api/books', function (req, res) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

//Get genre by ID 
app.get('/api/genres/:_id', function (req, res) {
    Genre.getGenreById(req.params._id, function (err, genre) {
        if (err) { throw err; }
        res.json(genre);
    });
});

//Get book by ID 
app.get('/api/books/:_id', function (req, res) {
    Book.getBookByID(req.params._id, function (err, books) {
        if (err) { throw err; }
        console.log(books);
        res.json(books);
    });
});

//Update book by ID 
app.put('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

//Remove book by ID 
app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id; 
    var book = req.body;
    Book.deleteBook(id, function(err, book){
        if(err){
            throw err; 
        }
    });
    res.json(book);
});


app.listen('3000');
console.log("App is running in port 3000");

