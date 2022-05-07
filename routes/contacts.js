//All the routes for working with the contacts DB
//Week 1 and 2

const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

//Add the proper JSON headers for POST and PUT operations
routes.use(bodyParser.json());

//Get all contacts
routes.get('/', (req, res) => {
    const results = connect.getCollection().find();
    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log("All contacts returned")
    });

});

//Get one contact by ID passed in the URL
routes.get('/:id', (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const results = connect.getCollection().find({_id: contactId});
    results.toArray().then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`1 contact returned ${req.params.id}`)
    });
    
});

//Add a new contact
routes.post('/', (req, res) => {

//Response already has JSON header from bodyParser
//"contact" will be in JSON format
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

//Update an existing contact
routes.put('/:id', (req, res) => {
    const contactId = new ObjectId(req.params.id);
    connect.getCollection().findOneAndUpdate(
        { _id: contactId},
        { $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
            }
        },
        {
            upsert: true, returnNewDocument: true
        }
    )
        .then(result => {console.log(result);
            res.status(202).json(); 
        })
        .catch(error => {
            console.log(error);
            res.status(500).json()
        })
});

//Delete a contact by ID passed in URL
routes.delete('/:id', (req, res) => {
    contactId = new ObjectId(req.params.id);
    connect.getCollection().deleteOne(
        { _id: contactId }
    )
    .then(result => {console.log(result);
        res.status(202).json(); 
    })
    .catch(error => {
        console.log(error);
        res.status(500).json();
    })
})

module.exports = routes;

