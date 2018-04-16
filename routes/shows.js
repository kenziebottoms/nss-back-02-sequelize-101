"use strict";

const { Router } = require('express');
const bodyParser = require('body-parser');
const router = Router();

const { Show, Director, User } = require('../models');

router.get('/', (req, res, next) => {
  Show.findAll({ include: [{ model: Director, attributes: ['name'] }] })
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => next(err));
});
router.get('/:id', (req, res, next) => {
  Show.findOne({
    raw: true,
    where: { id: req.params.id }
  })
    .then(show => {
      res.status(200).json(show);
    })
    .catch(err => next(err));
});
router.patch('/:id', (req, res, next) => {
  Show.find({where: {id: req.params.id}})
    .then(obj => {
      return obj.updateAttributes(req.body);
    })
    .then(obj => {
      res.status(201).json(obj);
    })
    .catch(err => next(err));
});

module.exports = router;