const express=require("express");
const { fetchUserById, updateUser } = require("../controller/User");
const router=express.Router();
//for fetching user details 
router.get("/own",fetchUserById)
      .patch("/:id",updateUser)
exports.router=router