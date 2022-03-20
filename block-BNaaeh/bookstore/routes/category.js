var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.get('/', (req, res) => {

    Category.find({}, (err, category) => {
        console.log('it is category', category);
        res.redirect('/books');

    })


})


router.get('/:name', (req, res) => {
    const name = req.params.name;
    Category.find({ category: name }, (err, category) => {
        if (err) return next(err);
        console.log(category[0].category);
        if(category[0].category){
            console.log('it is category', category[0]);
            let books = category[0].booksId
    
            res.render('bookstore', { books })
        }else{
            res.send('Author is not available');
        }
        
    }).populate('booksId').exec((err, category) => {

    })

})





module.exports = router;