const express=require("express");

const { addToCart, fetchCartByUser, deleteFromCart, UpdateCart } = require("../controller/Cart");
const router=express.Router();
// /products is already added in a base path
router.post("/",addToCart)
      .get("/",fetchCartByUser)
      .delete("/:id",deleteFromCart)
      .patch("/:id",UpdateCart)
exports.router=router;