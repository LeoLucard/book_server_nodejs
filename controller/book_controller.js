const mongoose = require('mongoose');
const BookModel = require('../model/book');
const asyncHandler = require('../helper/async_handler');
const ErrorResponse = require('../helper/error_response');
const Response = require('../helper/response');
const { myCustomLabels } = require('../helper/pagination');

//----------------------------------------------------------------------------------

//  @desc                   GET Books
//  @route                  GET /api/books
//  @access                 PUBLIC
const getBooksController = asyncHandler(async (req,res,next)=>{
    //--- Query Data ---//
    const {type,page} = req.query;

    try {
        //Get Book From Database
        const books = await BookModel.paginate(type ? {
            "category" : {
                $in : type,
            }
        } : {},
        {
            sort: { 'updatedAt': -1 },
            page: parseInt(page) || 1,
            limit: 10,
            allowDiskUse: true,
            customLabels: myCustomLabels,
        });
        //Send Response
        res.status(200).json(Response(200,books));
    } catch (error) {
        //Send Error
        res.status(403).json(ErrorResponse(error,403));
    }
});

//  @desc                   Create Book
//  @route                  POST /api/books
//  @access                 PRIVATE
const createBookController = asyncHandler(async (req,res,next)=>{
    //--- Body Data ---//
    const {title,body,category} = req.body;

    try {
        //Create Book To Database
        const book = BookModel({
            "_id" : mongoose.Types.ObjectId(),
            "title" : title,
            "body" : body,
            "category" : category,
        });

        const createdBook =await book.save();

        //Send Response
        res.status(201).json(Response(201,createdBook));
    } catch (error) {
        //Send Error
        res.status(403).json(ErrorResponse(error,403));
    }
});

module.exports = { getBooksController , createBookController};