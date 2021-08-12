const pool = require('../database');

module.exports = {

    async fullInfoHouse() {
        const houses = await pool.query('SELECT * FROM houses');

        for (let i = 0; i < houses.length; i++) {
            const house = houses[i];
            const images = await pool.query('SELECT * FROM images WHERE house_id = ? LIMIT 3', [house.id]);
            house.images = images;
        }

        return houses;   
    }

};