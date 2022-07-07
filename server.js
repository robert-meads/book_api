const http = require('http');
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require('./controllers/bookController');

const server = http.createServer((req, res) => {
  // regex stuff
  const main_path = '/api/books';
  const end = '$';
  const num_path = '/([0-9]+)';
  const uuid_path = '/([a-zA-Z0-9-]+)';

  const home = new RegExp(`${main_path + end}`);
  const get_id = new RegExp(`${main_path + uuid_path}`);

  if (home.test(`${req.url}`) && req.method === 'GET') {
    console.log('Inside get all.');
    getBooks(req, res);
  } else if (get_id.test(req.url) && req.method === 'GET') {
    // match function returns an array of values and properties. Print it out to see why we want index 1.
    // WHY IS ID NULL???????
    // also, write a logger that logs meta data about what is being done.

    // console.log('Inside get one.');

    // Whats the diff between these two console logs?
    // console.log(`${get_id}`);
    // console.log(typeof `${get_id}`);  // -> This is a string containing a regex.
    // console.log(get_id);
    // console.log(typeof get_id);  // -> This is a regex obj.

    // Many problems I have with JS is that there are so many diff object types that sometimes
    // I hope my arguments work but it doesn't. Check argument types.

    const id = req.url.match(get_id)[1];

    // const id = req.url.match(`${get_id}`)[1];  -> This is accessing nothing since it is not using a regex patter but a string that looks like a regex pattern. Since no match, str.match() returns null. Trying to access a null array index 1.
    // console.log(id);
    // const id = req.url.match(/\/api\/books\/([0-9]+)/)[1];

    getBook(req, res, id);
  } else if (req.url === '/api/books' && req.method === 'POST') {
    addBook(req, res);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.match(/\/api\/books\/([0-9]+)/)[1];
    console.log(id);
    console.log('updating...');
    updateBook(req, res, id);
  } else if (
    req.url.match(/\/api\/books\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.match(/\/api\/books\/([0-9]+)/)[1];
    deleteBook(req, res, id);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// Goal: see if you can put MVC  into your own words by looking at traversy's example.

// Goal: create a todo list as described by https://www.codecademy.com/article/mvc
// using node and js

// Original Library
/*
[
  {
    "title": "Freddy vs Jason",
    "author": "Bob Myers",
    "id": 1
  },
  {
    "title": "Call of the Wild",
    "author": "Jack Nature",
    "id": 2
  },
  {
    "title": "Spirited Away",
    "author": "Hayao Miyazaki",
    "id": 4
  },
  {
    "title": "Harry Potter",
    "author": "J K Rowling",
    "id": 5
  },
  {
    "title": "Parrot High",
    "author": "Zoo Brigrade",
    "id": 6
  }
]


*/
