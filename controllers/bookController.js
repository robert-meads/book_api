const Books = require('../models/bookModel');
const { getPostData } = require('../utils');
const books = require('../data/books.json');
const { writeDataToFile } = require('../utils');

// Get all the books.
async function getBooks(req, res) {
  try {
    const books = await Books.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // The books array is filled with objects.
    // console.log('Regular JSON: ', books);
    // console.log(typeof books);

    // Here, we convert those js objects into JSON strings.
    // console.log('JSON String: ', JSON.stringify(books));
    // console.log(typeof JSON.stringify(books));

    res.end(JSON.stringify(books));

    // This doesnt work...
    // res.end(books);
  } catch (err) {
    console.log(err);
  }
}

// Find one book.
async function getBook(req, res, id) {
  try {
    const book = await Books.findOne(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(book));
  } catch (err) {
    console.log(err);
  }
}

/*
  Easy example before getting post data from request body.

  Create a static book.
  Need to add it to data's book.json file to update our "database".
  Return our static book to user.
*/

// Post request
async function addBook(req, res) {
  try {
    const body = await getPostData(req);

    const { title, author } = JSON.parse(body);

    const book = {
      title,
      author,
    };

    const addedBook = await Books.add(book);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(addedBook));
  } catch (err) {
    console.log(err);
  }
}

// How do I update a particular book?
/*
  Grab the book we want to update.
  Get the fields we want to update from user request message.
  Update the fields of the original book.
  Add book to database.
*/
// Update Book
async function updateBook(req, res, id) {
  try {
    const book = await Books.findOne(id);
    const body = await getPostData(req);
    const { title, author } = JSON.parse(body);

    const updatedBook = {
      title: title || book.title,
      author: author || book.author,
      id,
    };

    console.log(updatedBook);

    // Either I want to override the original target book OR, filter out the original from original array and append updated book to new array. 1st choice looks easier.
    const targetIndex = await Books.findIndexOfBook(id);

    // Override server's array with updated book.
    books[targetIndex] = updatedBook;

    console.log(books);

    console.log(books[targetIndex]);

    writeDataToFile('./data/books.json', books);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedBook));
  } catch (err) {
    console.log(err);
  }
}

// Delete book
/*
  Filter array.
  Write modified array to database.
*/
async function deleteBook(req, res, id) {
  try {
    const msg = await Books.deleted(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(msg));
  } catch (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};
