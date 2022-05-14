const res = require('express/lib/response');

const routes = require('express').Router();

/* routes.get('/', (req, res) => {
    res.redirect('/api-docs');
}); */

routes.use('/', 
    (gitHome = (req, res) => {
        let gitHome = {
        gitHomeURL: 'https://github.com/thorlarsen/cse341-nodedev',
    };
    res.send(gitHome);
})
);

module.exports = routes;