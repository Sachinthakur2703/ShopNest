const express=require("express");
const { createOrders, fetchOrderByUser, deleteOrder, UpdateOrder, fetchAllOrders } = require("../controller/Order");
const router=express.Router();
// /products is already added in a base path
router.post("/",createOrders)
      .get("/own/",fetchOrderByUser)
      .delete("/:id",deleteOrder)
      .patch("/:id",UpdateOrder)
      .get("/",fetchAllOrders)
exports.router=router;