const pool = require('../database');

module.exports = {

    async houseInfo(house_id) {
        const house = await pool.query('SELECT * FROM houses WHERE id = ?', [house_id]);
        const allImages = await pool.query('SELECT * FROM images WHERE house_id = ?', [house_id]);
        house[0].images = allImages;

        return house[0];
    }

};