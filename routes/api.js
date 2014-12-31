var debug = require('debug')('server');
var express = require('express');
var router = express.Router();
var models  = require('../models');

// middleware to use for all requests
router.use(function(req, res, next) {
    if (req.body.id) {
        delete req.body.id;
    }

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    next(); // make sure we go to the next routes and don't stop here
});

// GET /
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }); 
});

// ----------------------------------------------------
router.route('/people')

    // GET /people
    .get(function(req, res) {

        var pagination = {
            page: req.query.page || 1,
            start: req.query.start || 0,
            offset: req.query.offset || 0,
            limit: req.query.limit || 20
        };

        models.Person
            // .findAll()
            .findAndCountAll({
                order: 'id DESC',
                offset: pagination.start,
                limit: pagination.limit
            })
            .then(function (result) {
                res.json({
                    count: result.count,
                    rows: result.rows,
                    pagination: pagination 
                });
            })
            .catch(function (error) {
                res.json({
                    message: 'Error getting people.'
                })
            })
        ;

    })

    // POST /people
    .post(function(req, res) {
        models.Person
            .build(req.body)
            .save()
            .then(function (person) {
                res.json(person);
            })
            .catch(function (error) {
                res.json({
                    message: 'Error creating person.'
                })
            })
        ;
        
    })
;

// on routes that end in /people/:person_id
// ----------------------------------------------------
router.route('/people/:person_id')

    // GET /people/:person_id
    .get(function(req, res) {

        models.Person
            .find(req.params.person_id)
            .then(function (person) {
                res.json(person);
            })
            .catch(function (error) {
                res.json({
                    message: 'Error getting person.'
                })
            })
        ;

    })

    // PUT /people/:person_id
    .put(function(req, res) {

        models.Person
            .find(req.params.person_id)
            .then(function (person) {
                person
                    .updateAttributes(req.body)
                    .then(function (person) {
                        res.json(person);
                    })
                    .catch(function (error) {
                        res.json({
                            message: 'Error updating person.'
                        })
                    })
                ;
            })
            .catch(function (error) {
                res.json({
                    message: 'Error getting person.'
                })
            })
        ;

    })

    // DELETE /people/:person_id
    .delete(function(req, res) {

        models.Person
            .find(req.params.person_id)
            .then(function (person) {
                person
                    .destroy()
                    .then(function (person) {
                        res.json({
                            message: 'Person deleted.'
                        })
                    })
                    .catch(function (error) {
                        res.json({
                            message: 'Error deleting person.'
                        })
                    })
                ;
            })
            .catch(function (error) {
                res.json({
                    message: 'Error getting person.'
                })
            })
        ;

    })

;

module.exports = router;
