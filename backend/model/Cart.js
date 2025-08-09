const mongoose=require("mongoose");
const {Schema}=mongoose;
const cartSchema=new Schema({
    //with the help of reference it will get all access of value of product and user
    quantity:{type:Number,required:true},
    product:{type:Schema.Types.ObjectId,ref:"Product",required:true},  //Model Ref same name Product
    user:{type:Schema.Types.ObjectId,ref:"Users",required:true},    //Model Ref same name Users
})
 const virtual = cartSchema.virtual("id");
 virtual.get(function(){
    return this._id;
 })
 cartSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
 })
exports.Cart=mongoose.model("Cart",cartSchema)