const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    userID:{type:String,required:true}
})

const Postmodel=mongoose.model("Posts",postSchema);

module.exports={
    Postmodel
}
