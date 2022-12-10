const express = require('express');
const { getBooksController , createBookController , getAllCategory , createCategory , deleteCategory} = require('../controller/book_controller');

const router = express.Router();

router.get('/books', getBooksController);
router.post('/books', createBookController);

router.post('/createCategory' , createCategory);
router.get('/getCategory' , getAllCategory);
router.post('/deleteCategory' , deleteCategory);

module.exports = router;