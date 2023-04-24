// nitrogen 
// pottassium
// phosphorous
// ph
// rainfall
// humidity

const mongoose = require("mongoose")
const componentMeasures = mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users"
        },
        nitrogen : {
            type : integer,
            required : true
        },
        pottassium : {
            type : integer,
            required : true
        },
        phosphorous : {
            type : integer,
            required : true
        },
        pH : {
            type : integer,
            required : true
        },
        rainfall : {
            type : integer,
            required : true
        },
        humidity : {
            type : integer,
            required : true
        },
    },
    {
        timestamps : true
    }
);

const soilComponents = mongoose.model("SoilComponents", componentMeasures)

module.exports = soilComponents;