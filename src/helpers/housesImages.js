/* const { House, Image } = require('../models'); */

const pool = require('../database');

module.exports = {

    /*    async fullInfoHouse(imagesLimit) {
           const houses = await House.find();
           console.log("Casas: " + houses);
           console.log(Image.find()); 
           const newHouses = [];
   
           for (let house of houses) {
               const allImages = await Image.find({ house_id: house._id }).limit(imagesLimit).sort({timestamp: 1});
               house.images = allImages;
               newHouses.push(house);
           }
   
           return newHouses;  
       } */

    async fullInfoHouse() {
        const houses = await pool.query('SELECT * FROM houses');

        for (let i = 0; i < houses.length; i++) {
            const house = houses[i];
            const images = await pool.query('SELECT * FROM images WHERE house_id = ? LIMIT 3', [house.id]);
            house.images = images;
            console.log(house);
        }

        return houses;  
    }

};