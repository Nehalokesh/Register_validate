const express=require('express');

const app = express();

const mongoose=require('mongoose');
const ProductRouter = require('./router/productrouter');

const connectDatabase = require("./utils/database");

app.use(express.json());
connectDatabase()

app.use(ProductRouter);
let PORT = 5000;
app.listen(PORT,(err)=>{
    if(err){
        console.log(`Server failed to listen on port ${PORT}`);
    }else{
        console.log(`Server listening on port ${PORT}`);
    }
});