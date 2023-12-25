const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/api");

const productdata = new mongoose.Schema({
  title: String,
  id: {
    type: Number,
    default: 2,
  },
  price: String,
  category: String,
  img: String,
  description: String,
  feature: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Object,
    default: {
      rate: 3.9,
      count: 120,
    },
  },
});

module.exports = mongoose.model("Products", productdata);
