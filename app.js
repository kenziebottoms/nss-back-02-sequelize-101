"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("models", require("./models"));
const { User, Show, Director } = app.get("models");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/shows", (req, res, next) => {
  Show.findAll({ include: [{ model: Director, attributes: ["name"]}] })
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => next(err));
});
app.get("/shows/:id", (req, res, next) => {
  Show.findOne({
    raw: true,
    where: {id: req.params.id}
  })
    .then(show => {
      res.status(200).json(show);
    })
    .catch(err => next(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});