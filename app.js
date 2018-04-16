'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('models', require('./models'));
const { User, Show, Director } = app.get('models');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/shows', (req, res, next) => {
  Show.findAll({ include: [{ model: Director, attributes: ['name'] }] })
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => next(err));
});
app.get('/shows/:id', (req, res, next) => {
  Show.findOne({
    raw: true,
    where: { id: req.params.id }
  })
    .then(show => {
      res.status(200).json(show);
    })
    .catch(err => next(err));
});
app.patch('/shows/:id', (req, res, next) => {
  Show.find({where: {id: req.params.id}})
    .then(obj => {
      return obj.updateAttributes(req.body);
    })
    .then(obj => {
      res.status(201).json(obj);
    })
    .catch(err => next(err));
});

app.get('/users/:uid', (req, res, next) => {
  User.findById(req.params.uid)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => next(err));
});

app.get('/users/:uid/favorites', (req, res, next) => {
  User.findById(req.params.uid)
    .then(user => {
      return user.getFavorites();
    })
    .then(faves => {
      res.status(200).json(faves);
    })
    .catch(err => next(err));
});
app.post('/favorites', ({ body: { UserId, ShowId } }, res, next) => {
  User.findById(UserId)
    .then(user => {
      console.log(user);
      return user.addFavorite(ShowId)
    })
    .then(record => {
      res.status(201).json(record);
    })
    .catch(err => next(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});