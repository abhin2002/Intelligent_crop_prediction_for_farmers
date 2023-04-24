// User Name
// profilePic
// Phone
// Email
// DOB
// Password

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userModel = mongoose.Schema(
    {
        userName : { 
            type : String,
            trim : true 
        }, 

        password : {
            type : String
        },

        selectedCrops : [
            {
                type : String,
                trim : true,
            },
            ],
    },
    {
        timestamps : true
    }

);

userModel.methods.matchPassword = async function(enteredPassword){
    const comparison = await bcrypt.compare(enteredPassword,this.password)
    return comparison;
}


const Users = mongoose.model("Users", userModel)

module.exports = Users;