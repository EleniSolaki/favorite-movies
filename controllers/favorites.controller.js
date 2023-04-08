const Favorite = require('../models/favorite.model');

exports.findAll = function(req, res){
    Favorite.find({},(err, results)=>{
        if (err){
            res.status(400).json({status:false, data:err});
            console.log('Problem in opening favorites', err);
        }else{
            res.status(200).json({status:true, data:results});
            console.log('Success opening favorites');
            console.log(results);
        }
    }) 
}



exports.create = function(req,res){
    console.log(req.params)
    console.log(req.body.title)
    const newFavorite = new Favorite({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre
    })
    console.log("Insert movie with title", req.body.title);
        console.log("Insert movie with year", req.body.year);
        console.log("Insert movie with genre", req.body.genre);


    newFavorite.save((err,result)=>{
        if(err){
            res.status(400).json({status:false, data:err});
            console.log(`Problem in adding movie`, err);
        }else{
            res.status(200).json({status:true, data:result});
            console.log('Success in adding movie');
        }
    })
}