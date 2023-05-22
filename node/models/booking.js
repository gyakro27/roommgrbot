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
    roomId: {
        required: true,
        type: String
    },
    room: {
        required: false,
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
    desc: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('booking', dataSchema)