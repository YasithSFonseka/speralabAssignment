const express = require("express");

const {
  getProducts,
  createProducts,
} = require("../controllers/productControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getProducts);
router.route("/create").post(protect, createProducts);

module.exports = router;
