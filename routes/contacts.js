const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

routes.use(bodyParser.json());

routes.get('/', (req, res) => {
    const results = connect.getCollection().find();
    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log("All contacts returned")
    });

});
  
routes.get('/:id', (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const results = connect.getCollection().find({_id: contactId});
    results.toArray().then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`1 contact returned ${req.params.id}`)
    });
    
});

routes.post('/', (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
      connect.getCollection().insertOne(contact)
          .then(result => {
              console.log(result);
          })
          .then(res.status(201).json())
          .catch(error => {
              console.log(error);
              res.status(500).json();
              console.log(error);
          });
});

module.exports = routes;

