const express=require("express");
const {fetchCategories, createCategories}=require("../controller/Category")
const router=express.Router();
// /products is already added in a base path
router.get("/",fetchCategories)
      .post("/",createCategories)
exports.router=router