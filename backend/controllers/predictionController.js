const asyncHandler = require("express-async-handler")
const soilComponents = require("../models/soilModel")

const predict = asyncHandler(async function(req,res){
    if(!req.body.nitrogen || !req.body.pottassium || !req.body.phosphorous || !req.body.ph || !req.body.rainfall || !req.body.humidity){
                // If the input to these fields arent given error
        return res.status(400).send({message : "Please fill the remaining fields"})
    }
    try{
        const soil =  await soilComponents.create({
            // userId : req.user,
            nitrogen : req.body.nitrogen,
            pottassium : req.body.pottassium,
            phosphorous : req.body.phosphorous,
            ph : req.body.ph,
            rainfall : req.body.rainfall,
            humidity : req.body.humidity,
        })
        if(soil){
            res.status(201).json({
                _id : soil._id,
                nitrogen : soil.nitrogen,
                pottassium : soil.pottassium,
                phosphorous : soil.phosphorous,
                ph : soil.ph,
                rainfall : soil.rainfall,
                humidity : soil.humidity,
            })
        }else{
            res.status(400) 
            err = new Error("Failed to Create the Soil components")
            throw err
        }
    }
    catch(err){
        console.log(err);
    }
})