const mongoose = require('mongoose');
const BookModel = require('../model/book');
const CategoryModel = require('../model/category');
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

//  @desc                   CREATE CATEGORY
//  @route                  POST /api/createCategory
//  @access                 PRIVATE
const createCategory = asyncHandler(async (req,res,next) => {
    const {name,value} = req.body;

    try {
        //Create Category To Database
        const category = CategoryModel({
            "_id" : mongoose.Types.ObjectId(),
            "name" : name,
            "value" : value,
        });

        const createdCategory =await category.save();

        //Send Response
        res.status(201).json(Response(201,createdCategory));
    } catch (error) {
        //Send Error
        res.status(403).json(ErrorResponse(error,403));
    }    
})

//  @desc                   Delete CATEGORY
//  @route                  POST /api/deleteCategory
//  @access                 PRIVATE
const deleteCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.body;
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);

    res.status(200).json(Response(200,deleteCategory));
})

//  @desc                   GET CATEGORY
//  @route                  POST /api/getCategory
//  @access                 PRIVATE
const getAllCategory = asyncHandler(async(req,res,next) => {
    // Category List
    const categoryList = await CategoryModel.find();

    res.status(200).json(Response(200,categoryList));
})

module.exports = { getBooksController , createBookController , getAllCategory , createCategory , deleteCategory};