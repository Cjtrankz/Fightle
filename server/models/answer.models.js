const mongoose = require('mongoose');

//schema
const AnswerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    dispName: {
        type: String,
        required: [true, "Name is required"]
    },
    imgURL: { 
        type: String,
        required: [true, "Type is required"]
    },
    game: {
        type: String,
        required: [true, "Description is required"]
    },
    height: {
        type: Number
    },
    origin: {
        type: String
    }
}, {timestamps:true})

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;