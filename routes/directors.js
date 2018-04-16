"use strict";

const { Router } = require("express");
const { Show, Director, User } = require('../models');
const router = Router();

router.get('/', (req, res, next) => {
  Director.findAll()
    .then(directors => {
      res.status(200).json(directors)
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  Director.findById(req.params.id)
    .then(director => {
      res.status(200).json(director);
    })
    .catch(err => next(err));
});

router.get('/:id/shows', (req, res, next) => {
  Director.findById(req.params.id)
    .then(director => {
      return Show.find({where: {directorId: req.params.id}});
    })
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  Director.create(req.body)
    .then(director => {
      res.status(200).json(director);
    })
    .catch(err => next(err));
});

module.exports = router;