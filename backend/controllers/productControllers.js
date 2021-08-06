const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const generateToken = require("../utils/generateToken");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.json(products);
});

const createProducts = asyncHandler(async (req, res) => {
  const { name, description, quantity } = req.body;

  if (!name || !description || !quantity) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const product = new Product({
      user: req.user._id,
      name,
      description,
      quantity,
    });

    const createdProducts = await product.save();

    res.status(201).json(createdProducts);
  }
});

module.exports = { getProducts, createProducts };
