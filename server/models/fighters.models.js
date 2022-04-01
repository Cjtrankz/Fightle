const mongoose = require('mongoose');

//schema
const FighterSchema = new mongoose.Schema({
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

const Fighter = mongoose.model("Fighter", FighterSchema);

module.exports = Fighter;