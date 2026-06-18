const express = require("express");
const router = express.Router();
const Client=require("../models/client");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        let client = await Client.findOne({email});
        if(client){
            return res.status(400).json({message:"User Already Exist"});
        }
        const hashpass = await bcrypt.hash(password,10);
        client = new Client({
            name,
            email,
            password:hashpass
        });
        await client.save();
        res.json({message:"User Created Succesfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});
module.exports=router;