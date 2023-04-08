const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

let userSchema = new Schema({
    title:{
            type: String,
            max: 200,
            unique: true,
            trim: true,index:true, unique:true,sparse:true
    },
    year:{
        type:String
    },
    genre:{
        type:String
    }
    
},
{
    collection:"user",
    timestamps:true
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('FavoriteMovie',userSchema);