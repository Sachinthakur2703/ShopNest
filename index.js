require("dotenv").config()
const express=require("express")
const server=express();
const mongoose=require("mongoose");
const path=require("path")
const session=require("express-session")
const passport=require("passport")
const LocalStrategy=require("passport-local").Strategy;
const crypto=require("crypto");
const jwt=require("jsonwebtoken")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser=require("cookie-parser")

const productRouters=require("./routes/Product")
const categoryRouters=require("./routes/Category")
const brandRouters=require("./routes/Brands")
const usersRouters=require("./routes/User")
const authRouters=require("./routes/Auth")
const cartRouters=require("./routes/Cart")
const orderRouters=require("./routes/Order")
const cors=require("cors");
const { Users } = require("./model/User");
const { isAuth,sanitizeUser, cookieExtractor } = require("./services/common");



// JWT options

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY; // TODO: should not be in code;


//middleware
server.use(express.static(path.resolve(__dirname,"build")))
server.use(cookieParser())
server.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false
}))

server.use(passport.authenticate("session"))
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json());
server.use("/products",isAuth(),productRouters.router)
//we can also use jwt token for client-only auth
server.use("/category" ,isAuth(),categoryRouters.router)
server.use("/brand",isAuth(),brandRouters.router)
server.use("/users",isAuth(),usersRouters.router)
server.use("/auth",authRouters.router)
server.use("/cart",isAuth(),cartRouters.router)
server.use("/orders",isAuth(),orderRouters.router)
//mail endpoint
// this line we add to make react router work in case of other routes doesnt match
server.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));







//Passport Strategies

passport.use("local",
  new LocalStrategy(
    //by default passport uses username
    {usernameField:"email"},
   async function(email, password, done) {
        try{
            const user=await Users.findOne({email:email});     
            if(!user){
              done(null,false,{message:"invalid credentials"})
           }
            crypto.pbkdf2(
              password,
              user.salt,
              310000,
              32,
             "sha256",   //algorithm
          async function(err,hashedPassword){
           
           if(!crypto.timingSafeEqual(user.password, hashedPassword)){
               //to do: we will make independent addresses after this
               //this lines  sends to serializer
              return done(null,false,{message:"invalid credentials"})
           }
           const token=jwt.sign(sanitizeUser(user),process.env.JWT_SECRET_KEY )
           done(null,{id:user.id,role:user.role,token})
       
          }
        )}
        catch(err){
          done(err)
        }
    }
  ));
  passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log({ jwt_payload });
      try {
        const user = await Users.findById(jwt_payload.id );
        if (user) {
          return done(null, sanitizeUser(user)); 
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    console.log('serialize', user);
    process.nextTick(function () {
      return cb(null, {id:user.id,role:user.role});
    });
  });

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
    console.log('de-serialize', user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  //payment
 

main().catch(err=>console.log(err))
async function main(){
try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("database connected ")
}
catch(error){
    console.log(error)
}
}





server.listen(process.env.PORT,()=>{
    console.log("server started")
})