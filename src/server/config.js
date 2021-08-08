const path = require('path');

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');


module.exports = app => {

    const corsOptions = {
        origin: function (origin, callback) {
            if (whiteList.indexOf(origin) != -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not Allowed by CORS'))
            }
        }
    }

    //Settings
    app.set('port', process.env.PORT || 3050);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', '.hbs');

    //Middlewares
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    //routes
    routes(app);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    if ('development' == app.get('env')) {
        app.use(errorHandler)
    }

    return app;

}
