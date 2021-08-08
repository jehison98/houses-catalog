const ctrl = {};
const house = require('../helpers/oneHouse');

ctrl.index = async (req, res) => {
    const houseInfo = await house.houseInfo(req.params.house_id)
    res.render('house', {houseInfo});
}

module.exports = ctrl;   