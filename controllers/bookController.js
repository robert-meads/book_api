const Books = require('../models/bookModel');

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

async function getBook(req, res, id) {
  try {
    const book = await Books.findOne(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(book));
  } catch (err) {
    console.log(err);
  }
}

async function addBook(req, res) 

module.exports = {
  getBooks,
  getBook,
};
