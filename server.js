const express=require("express");
const app=express();
//--create middleware that will check the number of request
//--if the number of request is greater than 10, reeturn response with status code 429-too many requests
//--if nunber of request is less 10, call the next middlewarre
let requestCountVal=0;
//--middleware
let requestCount=(req,res,next)=>{
      requestCountVal++;
      console.log(requestCountVal);
      if(requestCountVal > 3){
            return res.status(429).json("Too many request");
      }
      next();
};
app.use(requestCount);
//--protected route
const protected=(req,res,next)=>{
      //console.log("hello");
      let userLoginDetails={
            isLogin: true,
            username:"Rhey"
      };
      if(userLoginDetails.isLogin){
            next();
      }else{
            return res.json("You must Login first Dude!");
      }
};
//--require isAdmin route middleware
const isAdmin=(req,res,next)=>{
      //console.log("hello");
      let userType={
            isLogin: true,
            username:"Rhey"
      };
      if(userType.isAdmin){
            console.log("Welcome ${userType.username}");
            next();
      }
      else{
            return res.json("you must be an admin!");
      }
};
//--app.use protected
//--home route
app.get("/",(req,res)=>{
      res.send("home page");
});
//--middle chained
//-login route
app.get("/login",(req,res)=>{
      res.send("login successful");
});
//--@rote authenticated users
//--create post route
app.get("/create-post",(req,res)=>{
      res.json({message:"Post created"});
});
//@role: public users
//--fetch all post route
app.get("/post",(req,res)=>{
      res.json({message:"fetch all post"});
});
//--role admin
//--delete route
app.delete("/posts/:id",protected, isAdmin,(req,res)=>{
      res.json({message:"Post Deleted"});
});
app.listen(3000,()=>{
      console.log("Server running at post 3000");
});