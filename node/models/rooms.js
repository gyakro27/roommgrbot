const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    buildingId: {
        required: true,
        type: String
    },
    building:{
        required: false,
        type: String
    }
})

module.exports = mongoose.model('room', dataSchema)