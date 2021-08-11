const ctrl = {};
const allHouses = require('../helpers/housesImages');

ctrl.index = async (req, res) => {
    const fullInfoHouses = await allHouses.fullInfoHouse();
    res.render('index', {fullInfoHouses}); 
}

module.exports = ctrl;  