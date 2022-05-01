const routes = require('express').Router();

routes.use('/', require('./home'));
routes.use('/contacts', require('./contacts'));

module.exports = routes;