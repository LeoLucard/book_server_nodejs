const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;


const BookSchema = Schema({
    _id: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
    },
    title : {
        required : true,
        type : mongoose.SchemaTypes.String,
    },
    body : {
        required : true,
        type : mongoose.SchemaTypes.String,
    },
    category: [
        {
            required: true,
            type: String,
        },
    ],
}, { timestamps: true });

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', BookSchema);
