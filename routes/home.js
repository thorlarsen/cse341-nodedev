// The route for the root path '/' will redirect to '/api-docs'

const res = require('express/lib/response');

const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.redirect('/api-docs');
}); 

module.exports = routes;