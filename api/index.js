import express from 'express'
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/user-auth")
.then(()=>console.log('connected to mongo db'))
.catch((err)=>{
    console.log(err)
})

const app = express();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})