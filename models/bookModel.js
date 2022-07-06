const books = require('../data/books.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

function findBookById(id, element) {
  return id === element.id;

  // console.log(element);
  // console.log(id);
  // if (element.id === id) {
  //   console.log('success');
  //   return element;
  // }
}

// id acts like a global variable in terms of findOne function. Don't need to pass it in to find() function call. Also part of lexical scope.
// Look at traversys: https://youtu.be/_1xa8Bsho6A?t=1908

function findOne(id) {
  return new Promise((resolve, reject) => {
    // using array find method to get book with matching id.

    function findBookById(id) {
      return (element) => {
        // url is a string. The number that was part of the url, is a string representing a number. That is why strict equality failed and returned undefined.
        // console.log(typeof id);
        // console.log(id);
        id = parseInt(id);

        return element.id === id;
      };
    }

    const target_book = findBookById(id);
    const result = books.find(target_book);

    if (result !== undefined) {
      resolve(result);
    } else {
      reject(`Book with id:${id} not found!`);
    }

    // 1st try. Didn't know how to pass id value to callback function for array.find().
    // const result = books.find((element) => {
    //   console.log(element);
    //   console.log(id);
    //   if (element.id === id) {
    //     console.log('success');
    //     return element;
    //   }
    // });
  });
}

function add(book) {
  return new Promise((resolve, reject) => {
    const newBook = { ...book, id: uuidv4() };
    books.push(newBook);
    writeDataToFile('./data/books.json', books);
    resolve(newBook);
    console.log('Difference between these two books:');
    console.log(books);
    console.log('\n\n');
    console.log(JSON.stringify(books));
  });
}

module.exports = {
  findAll,
  findOne,
  add,
};
