'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { User, Show, Director } = require('./models');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/shows', require('./routes/shows'));

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