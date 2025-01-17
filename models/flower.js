const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  symmetry: String, //radial or bilateral
  isPerfect: Boolean, //containing male & female organs
  lifeCycle: Number, //1 = annual 2= biennals, 3 = 2+ years
  vascular: Boolean, //containing vascular tissue
  image: String, //image of flower

});

const flower = mongoose.model('flower', flowerSchema);

module.exports = flower;