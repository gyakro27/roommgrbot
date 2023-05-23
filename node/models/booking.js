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

dataSchema.query.isOccupied = function(roomId, dateFrom, dateTo) {
    return this.find().where({roomId: roomId}).where('from').gte(dateFrom).lte(dateTo).where('to').lte(dateFrom).gte(dateTo);
}

module.exports = mongoose.model('booking', dataSchema)