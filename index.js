const express=require("express");
const cors=require("cors")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.routes");
const {postRouter}=require("./routes/posts.routes");
const {authentication}=require("./middlewares/authenticate.middleware");

const app=express();
require('dotenv').config()
app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.send("WELCOME");
})
app.use("/users",userRouter);
app.use(authentication);
app.use("/posts",postRouter);
const port=process.env.portno;
app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        console.log({"err":"error connecting to database"})
    }
    console.log(`The server is running at ${port}`);
})