const express = require('express');
const { getBooksController , createBookController } = require('../controller/book_controller');

const router = express.Router();

router.get('/books', getBooksController);
router.post('/books', createBookController);


module.exports = router;