

const { Orders } = require("../model/Order");
const { Users } = require("../model/User");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.fetchOrderByUser=async(req,res)=>{
    const{id}=req.user;
    try{
     const orderItems=await Orders.find({user:id})
     
     res.status(200).json(orderItems)

    }
    catch(err){
     res.status(400).json(err);
    }
}
exports.createOrders=async(req,res)=>{
    const order=new Orders (req.body)
    try{
        const doc=  await order.save()
        const user=await Users.findById(order.user)
        sendMail({to:user.email,html:invoiceTemplate(order),subject:"order Received"})
        res.status(201).json(doc)
       
    }catch(err){
        res.status(400).json(err)
    }
    
  
}
exports.deleteOrder=async(req,res)=>{
    const {id}=req.params;
    try{
     const doc=await Orders.findByIdAndDelete(id)
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err)
    }
    
  
}
exports.UpdateOrder=async(req,res)=>{
    const {id}=req.params;
    try{
     const order=await Orders.findByIdAndUpdate(id,req.body,{
        new:true,
     })
        res.status(201).json(order)
    }catch(err){
        res.status(400).json(err)
    }
    
  
}
exports.fetchAllOrders=async(req,res)=>{
    //here we need all query string
  
  //filter={"category":"smartphone"}
 //sort={_sort:"price",_order="desc"}
 //pagination={_page:1,_limit=10}
 //todo we have to try with multiple category and brands after change in front end
 let query=Orders.find({deleted:{$ne:true}})
 let totalOrdersQuery=Orders.find({deleted:{$ne:true}});

//Todo:how to get sort on discounted Price not on Actual Price
 if(req.query._sort && req.query._order){
    query= query.sort({[req.query._sort]:req.query._order})
    totalOrdersQuery= totalOrdersQuery.sort({[req.query._sort]:req.query._order})
 }
 const totalDocs=await totalOrdersQuery.countDocuments().exec();
 
 if(req.query._page && req.query._limit){
    const pageSize=req.query._limit;
    const page=req.query._page
    query= query.skip(pageSize*(page-1)).limit(pageSize);
  }
 
  try{
        const docs=  await query.exec();
        res.set("X-Total-Count",totalDocs)
        res.status(200).json(docs)
    }catch(err){
        res.status(400).json(err)
    }
    
  
}