const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    bookedBy: {
        required: true,
        type: String
    },
    place: {
        required: true,
        type: String
    },
    telegram: {
        required: true,
        type: String
    },
    from: {
        required: true,
        type: Date
    },
    to: {
        required: true,
        type: Date
    },
    place: {
        required: false,
        type: String
    },
    desc: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('booking', dataSchema)