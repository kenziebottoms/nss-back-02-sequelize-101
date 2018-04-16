"use strict";

const { Router } = require('express');
const bodyParser = require('body-parser');
const router = Router();

const { Show, User } = require('../models');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => next(err));
})

router.get('/:uid', (req, res, next) => {
  User.findById(req.params.uid)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => next(err));
});

router.get('/:uid/favorites', (req, res, next) => {
  User.findById(req.params.uid)
    .then(user => {
      return user.getFavorites();
    })
    .then(faves => {
      res.status(200).json(faves);
    })
    .catch(err => next(err));
});

module.exports = router;