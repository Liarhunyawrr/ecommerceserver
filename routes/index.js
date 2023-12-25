var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const usermodel = require("./register");
const passport = require("passport");
const productmodel = require("./users");
const cartmodel = require("./Cart");
const localstrategy = require("passport-local");
passport.use(new localstrategy(usermodel.authenticate()));

const apidata = require("./data.json");
let cart = [];
/* GET home page. */

router.get("/", async function (req, res, next) {
  res.send({ title: "Express" });
});
router.get("/api", function (req, res, next) {
  res.send(apidata);
});

//? add to cart route
router.get("/api/cart", async (req, res) => {
  const data = await cartmodel.find();
  res.send(data);
});

router.post("/api/cart/add", async (req, res) => {
  try {
    const cartitem = await cartmodel.create(req.body);
    cart.push(cartitem);
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/api/cart/:id", async (req, res) => {
  try {
    const data = await cartmodel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    await data.deleteOne();

    res.send("done");
  } catch (error) {
    res.send("product not found");
  }
});

//? method to create product
router.post("/api/products/newone", async function (req, res) {
  const product = await productmodel.create(req.body);

  res.send(product);
});

//? method to get all products
router.get("/api/products", async (req, res) => {
  const data = await productmodel.find();
  res.send(data);
});

//? method to delete all products
router.delete("/api/products", async (req, res) => {
  const result = await productmodel.deleteMany({});
  res.send("hello");
});

//?method to get product by id
router.get("/api/products/:id", async (req, res) => {
  try {
    const data = await productmodel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("product not found");
  }
});

//? method to change and update product
router.put("/api/products/:id", async (req, res) => {
  try {
    const data = await productmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//? method to delete a product
router.delete("/api/products/:id", async (req, res) => {
  try {
    const data = await productmodel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    await data.deleteOne();

    res.send("done");
  } catch (error) {
    res.send("product not found");
  }
});

router.post("/register", function (req, res) {
  var userdata = new usermodel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
  });

  usermodel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.send("send");
      });
    });
});

router.post("/login", passport.authenticate("local", {}), function (req, res) {
  res.json({ success: true, message: "login seccessfully" });
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
