const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.redirect('/contacts');
});

module.exports = routes;