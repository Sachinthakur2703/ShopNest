const mongoose=require("mongoose");
const {Schema}=mongoose;
const orderSchema=new Schema({
    //with the help of reference it will get all access of value of product and user
 items:{type:[Schema.Types.Mixed],required:true},
 totalAmount:{type:Number},
 totalItems:{type:Number},
 user:{type:Schema.Types.ObjectId,ref:"Users",required:true},
 paymentMethod:{type:String,required:true},
 status:{type:String,default:"pending"},
 selectAddress:{type:Schema.Types.Mixed,required:true}
},{timestamps:true})
 const virtual = orderSchema.virtual("id");
 virtual.get(function(){
    return this._id;
 })
 orderSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
 })
exports.Orders=mongoose.model("Orders",orderSchema)