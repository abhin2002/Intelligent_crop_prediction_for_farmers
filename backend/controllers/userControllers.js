const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async function(req,res) {
    const {userName,proPic,phone,email,DOB,password} = req.body // initializing the req.body values
                                                            // to the array of variables

    if(!userName || !phone || !email || !DOB || !password){
        res.status(400)
        throw new Error("Please enter all the Feilds")
    }
    const userExists = await Users.findOne({$or: [{email: email}, {phone: phone}]})
    // Checking whether the user exists in the db

    if(userExists){ 
        res.status(400)
        throw new Error("User already exists")
    }
    
    const user = await Users.create({
        userName : userName,
        profilePic : proPic,
        phone : phone,
        email : email,
        DOB : DOB,
        password : password,
        
    })
    if(user){
        res.status(201).json({
            _id : user._id,
            userName : user.userName,
            profilePic : user.proPic,
            phone : user.phone,
            email : user.email,
            DOB : user.DOB,
            password : user.password,
            token : generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Failed to Create New User")
    }
})

////////////////////////////////////////////////////////////////////////

const authUser = asyncHandler(async function(req,res){
    const {email, password} = req.body
    const user = await Users.findOne({$or: [{email: email}, {phone: email}]}) //email variable is given at phone
                                                                // coz we allow the phone number login

    if(user && await user.matchPassword(password)){
        res.json({
            _id : user._id,
            userName : user.userName,
            profilePic : user.proPic,
            phone : user.phone,
            email : user.email,
            DOB : user.DOB,
            password : user.password,
            token : generateToken(user._id),
        })
    }
})

module.exports = {registerUser, authUser, allUsers}