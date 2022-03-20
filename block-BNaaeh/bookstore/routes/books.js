var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');
var Category = require('../models/category');

/* GET users listing. */
router.get('/api/v1/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    console.log(books);
    res.render('bookstore', { books });
  })

});

//createbook form
router.get('/api/v1/new', (req, res, next) => {
  res.render('createBookForm');
})



//createList
router.post('/api/v1/', (req, res, next) => {


  req.body.categoryName = req.body.categoryName.split(' ');
  Book.create(req.body, (err, book) => {
    if (err) return next(err);

    req.body.booksId = book.id;

    Author.find({ authorName: req.body.authorName }, (err, author) => {
      if (err) return next(err);
      //console.log(author[0].authorName);
      if (author.length != 0) {
        author[0].booksId.push(book.id);

        // console.log(book,author);
        Author.update({ authorName: req.body.authorName }, { $push: { booksId: book.id } }, (err, updatedAuthor) => {
          //if(err)return next(err);
          console.log(updatedAuthor);
          //res.redirect('/books');
        });





      }
      else {

        Author.create(req.body, (err, author) => {
          if (err) return next(err);

          book.authorId = author.id;
          // console.log(book,author);
          Category.find({ categoryName: req.body.categoryName }, (err, category) => {

            if (err) return next(err);
            console.log(category);
            // category.booksId.push(book.id);
            res.redirect('/api/v1/books');
          })






        })


      }
    })
    //console.log(req.body.categoryName);
    req.body.categoryName.forEach(cat => {
      Category.find({ category: cat }, (err, category) => {
        // console.log(cat,category);
        if (err) return next(err)

        if (category.length != 0) {

          // console.log('it exist',category);
          console.log(category);
          Category.updateOne({ category: cat }, { $push: { booksId: book.id } }, (err, updatedCategory) => {
            //if(err)return next(err);
            console.log(updatedCategory);
            //res.redirect('/books');
            console.log('it exist just pushed the book id', updatedCategory);
            res.redirect('/api/v1/books');
          });



        } else {
          req.body.category = cat;
          Category.create(req.body, (err, ca) => {

            if (err) return next(err);
            console.log('it does not exist create the category in database', ca);
            res.redirect('/api/v1/books');
          })

        }

      })


    })





  })


})



router.get('/:name', (req, res) => {
  const name = req.params.name;
  Book.find({ title: name }, (err, books) => {
    res.render('bookstore', { books });
  })
})

module.exports = router;