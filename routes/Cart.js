const mongoose = require("mongoose");

const cartdata = new mongoose.Schema({
  items: [],
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  num:Number
});

module.exports = mongoose.model("Cart", cartdata);
