

const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
// const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connectDB.js');
const adminAuthRoutes=require('./src/routes/adminAuthRoutes.js');

const productRoutes=require("./src/routes/productRoutes.js")
const customRoutes=require("./src/routes/customRoutes.js")
const uploadRoutes=require("./src/routes/uploadRoute.js")
const contactRoutes=require("./src/routes/contactRoutes.js");
const blogRoutes=require('./src/routes/blogRoutes.js');
const allowedOrigins = [
    "http://localhost:5173",
    "http://65.108.1.122:8000"
]
dotenv.config();
connectDB();
const app=express();

app.use(bodyParser.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connectDB()







app.use('/api/admin/auth',adminAuthRoutes);
// app.use('api/admin/auth',adminAuthRoutes);
app.use('/api/admin/product',productRoutes);
// app.use('/api/admin/product',productRoutes);

app.use('/api/admin/product',customRoutes);
app.use("/api/admin/product", uploadRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/api",contactRoutes);
app.use('/api/admin',blogRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });








app.listen(process.env.PORT,()=>{
                console.log(`App is listion on port ${process.env.PORT}`);
            })
           

