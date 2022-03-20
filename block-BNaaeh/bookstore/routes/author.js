var express = require('express');
var router = express.Router();
var Author = require('../models/author');




router.get('/', (req, res) => {
    Author.find({}, (err, authors) => {
        // console.log('it is author',authors);
        res.redirect('/books');
    })

})


router.get('/:name', (req, res) => {
    const name = req.params.name;
    Author.find({ authorName: name }, (err, author) => {
        if (err) return next(err);
        if (author.authorName) {
            console.log('it is author', author[0].booksId);
            let books = author[0].booksId;
            res.render('bookstore', { books });
        } else {
            res.send('Author is not available');
        }

    }).populate('booksId').exec((err, author) => {

        //res.render('bookstore',{booksId:authors[0].booksId})
        // console.log(err,author);
    })

})





module.exports = router;