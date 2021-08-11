const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ImageSchema = new Schema({
    house_id: { type: ObjectId},
    filename: { type: String},
    url: { type: String},
});



module.exports = mongoose.model('Image', ImageSchema);