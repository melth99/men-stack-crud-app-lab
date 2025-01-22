const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({

  species: String,
  commonName: String,
  isPerfect: Boolean, //containing male & female organs
  image: String, //image of flower

});

const flowers = mongoose.model('flowers', flowerSchema);

module.exports = flowers;


