const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/api");
const userdata = new mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  cartitems: {
    type: Array,
    default: [],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  password: String,
});
userdata.plugin(plm);
const User = mongoose.model("User", userdata);
module.exports = User;
