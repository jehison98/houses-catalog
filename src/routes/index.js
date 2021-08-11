const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const house = require('../controllers/house');
const contact = require('../controllers/contact');


module.exports = app => {

    router.get('/', home.index);
  /*   router.get('/houses/:house_id', house.index);
    router.post('/contact', contact.index); */
    app.use(router);
}