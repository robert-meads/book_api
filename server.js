const http = require('http');
const { getBooks, getBook } = require('./controllers/bookController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/books' && req.method === 'GET') {
    getBooks(req, res);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === 'GET') {
    // match function returns an array of values and properties. Print it out to see why we want index 1.
    const id = req.url.match(/\/api\/books\/([0-9]+)/)[1];
    getBook(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    addBook(req, res);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// Goal: see if you can put MVC  into your own words by looking at traversy's example.

// Goal: create a todo list as described by https://www.codecademy.com/article/mvc
// using node and js
