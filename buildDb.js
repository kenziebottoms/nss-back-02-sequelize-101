"use strict";

let models = require("./models");
let { directors } = require("./seeders/data/directors");
let { shows } = require("./seeders/data/shows");

models.sequelize.sync({ force: true })
  .then(() => {
    return models.Director.bulkCreate(directors);
  })
  .then(() => {
    return models.Show.bulkCreate(shows);
  })
  .then((data) => {
    process.exit();
  });