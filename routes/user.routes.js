const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{Usermodel}=require("../models/user.model");
const userRouter=express.Router();


userRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                console.log(err);
            }
            else{
                const user=new Usermodel({name,email,gender,password:secure_password});
                await user.save();
                res.send("User registered");
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Errror while registering");
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result ==true){
                    const token=jwt.sign({userID:user[0]._id},"sanjay");
                    res.send({"msg":"login successful","token":token})
                }else{
                    res.send("Wrong credentials");
                }
            })
        }else{
            res.send("wrong credentials");
        }
    } catch (error) {
        console.log(error);
        console.log("something went wrong");
    }
})

module.exports={
    userRouter
}