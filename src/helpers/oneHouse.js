const { House, Image } = require('../models');

module.exports = {

    async houseInfo(house_id) {
        const house = await House.findOne({_id: house_id});
        const allImages = await Image.find({ house_id: house._id }).sort({timestamp: 1});
        house.images = allImages;

        return house;  
    }

}; 