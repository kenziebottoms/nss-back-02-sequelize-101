"use strict";

let models = require("./models");
let { directors } = require("./seeders/data/directors");

models.sequelize.sync({ force: true })
  .then(() => {
    return models.Director.bulkCreate(directors);
  })
  .then(() => {
    return models.Director.findAll({ raw: true });
  })
  .then((data) => {
    console.log(data);
    process.exit();
  });