const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors())
const port = 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser:true, useUnifiedTopology:true},
    (err)=>{
        if(err){
        console.log(err);
    }else{
        console.log("Connected to MongoDB");
    }
}
)


const favorites = require('./routes/favorites.routes');
app.use('/api/movies', favorites);




app.listen(port,()=>{
    console.log(`Server is listening in port ${port}`)
})
