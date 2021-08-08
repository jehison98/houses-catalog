const mongoose = require('mongoose');
const { Schema } = mongoose;

const HouseSchema = new Schema({
    title: { type: String },
    meters: {type: Number},
    baths: {type: Number},
    rooms: {type: Number},
    description: { type: String },
    video: { type: String },
    location: { type: String },
    timestamp: { type: Date, default: Date.now } 
});

HouseSchema.virtual('images')
    .set(function (images) {
        this._images = images;
    })
    .get(function () {
        return this._images
    });

module.exports = mongoose.model('House', HouseSchema);
