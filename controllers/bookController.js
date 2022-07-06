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

/*
  Easy example before getting post data from request body.

  Create a static book.
  Need to add it to data's book.json file to update our "database".
  Return our static book to user.
*/

// Post request
async function addBook(req, res) {
  try {
    let body = '';

    // Receives 'chunks' of the body at a time.
    // These chunks are in binary and so you have to convert to string.
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      // Time to pull out all the relevant data from the body we received.
      const { title, author, id } = JSON.parse(body);

      // Now we create our dynamic book. We don't need the static book we made previously. Now we've successfully created a new book using post data.
      const book = {
        title,
        author,
      };

      // Send book to model to be added to json file.
      const addedBook = await Books.add(book);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(addedBook));
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
};
