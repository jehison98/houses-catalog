const { House, Image } = require('../models');

module.exports = {

    async fullInfoHouse(imagesLimit) {
        const houses = await House.find();
        const newHouses = [];

        for (let house of houses) {
            const allImages = await Image.find({ house_id: house._id }).limit(imagesLimit).sort({timestamp: 1});
            house.images = allImages;
            newHouses.push(house);
        }

        return newHouses;  
    }

}; 