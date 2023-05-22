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

dataSchema.query.byBuilding = function(id){
    return this.where({buildingId: id})
}

module.exports = mongoose.model('room', dataSchema)