// require('dotenv').config({path:'./env'})
// const dotenv = require('dotenv');

// import mongoose from "mongoose";
// import { DB_NAME } from "./contants";
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connectDB.js');


dotenv.config();
connectDB();
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB()



app.listen(process.env.PORT,()=>{
                console.log(`App is listion on port ${process.env.PORT}`);
            })
           


// (async ()=>{r
//     try{

//         mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             throw error
//         });

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listion on port ${process.env.PORT}`);
//         })
       
//     }
//     catch(error){
//  console.log("Error",error)
//  throw err
//     }
// })