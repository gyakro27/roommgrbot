const mongoose = require('mongoose');
const Room = require("../models/rooms")
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('building', dataSchema)