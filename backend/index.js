

const dotenv = require('dotenv');
const express = require('express');
// const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connectDB.js');
const adminAuthRoutes=require('./src/routes/adminAuthRoutes.js');

const productRoutes=require("./src/routes/productRoutes.js")
const customRoutes=require("./src/routes/customRoutes.js")
dotenv.config();
connectDB();
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connectDB()







app.use('/api/admin/auth',adminAuthRoutes);
// app.use('api/admin/auth',adminAuthRoutes);
app.use('/api/admin/product',productRoutes);
// app.use('/api/admin/product',productRoutes);

app.use('/api/admin/product',customRoutes);










app.listen(process.env.PORT,()=>{
                console.log(`App is listion on port ${process.env.PORT}`);
            })
           

