const routes = require('express').Router();

routes.use('/', require('./home'));
routes.use('/contacts', require('./contacts'));
routes.use('/swagger', require('./swagger'));

module.exports = routes;