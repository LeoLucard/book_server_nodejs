const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = Schema({
    _id: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
    },
    name : {
        required : true,
        type : mongoose.SchemaTypes.String,
    },
    value : {
        required : true,
        type : mongoose.SchemaTypes.String,
    },
},{timestamps : true});

module.exports = mongoose.model("Category", CategorySchema);