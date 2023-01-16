const express=require("express");
const {Postmodel}=require("../models/posts.model");
const postRouter=express.Router();
// 1. If the device name is passed as query, then it should show only those posts from which device that post has been made.
//  2. For Example, device=MOBILE ==> will give mobile posts only.
// 3. device1=MOBILE & device2=PC ==> will give the posts made by mobile and PC.
postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const post=new Postmodel(payload);
        await post.save();
        res.send("Created the post")
    } catch (error) {
        console.log(error);
        res.send({"err":"Something went wrong"});
    }
})
postRouter.get("/",async(req,res)=>{
    const userID_req=req.body.userID;
    let  device1=req.query.device1|| "All";
    // let  device2=req.query.device1|| null;
    let  devices=[
        "Laptop",
        "laptop",
        "tv",
        "mobile",
        "pc",
        "computer"
    ]
    try {
        if(device1=="All"){
            device1=[...devices]
        }else{
            device1=req.query.device1;
        }
        // if(device2=="All"){
        //     device2=[...devices]
        // }else{
        //     device2=req.query.device2;
        // }
        const posts=await Postmodel.find({userID:userID_req}).
        where('device').in(device1);
        console.log("Here is all the posts");
        res.send(posts)
    } catch (error) {
        console.log(error);
        console.log({"err":"Something went wrong"});
    }
})

postRouter.patch("/update/:id",async (req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    const post=await Postmodel.findOne({_id:ID});
    const userID_post=post.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_post!=userID_req){
            res.send({"msg":"You are not authorized"})
        }else{
            await Postmodel.findByIdAndUpdate({_id:ID},payload);
            res.send({"msg":"Updated the Post"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
postRouter.delete("/delete/:id",async (req,res)=>{
    const ID=req.params.id;
    const post=await Postmodel.findOne({_id:ID});
    const userID_post=post.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_post!=userID_req){
            res.send({"msg":"You are not authorized"})
        }else{
            await Postmodel.findByIdAndDelete({_id:ID});
            res.send({"msg":"Deleted the Post"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
module.exports={
    postRouter
}