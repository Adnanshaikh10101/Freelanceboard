const express = require("express");
const router = express.Router();
const Client=require("../models/client");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const auth = require("../middleware/auth");
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
router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const client=await Client.findOne({email});
        if(!client){
            return res.status(400).json({message:"User Not Exist"});
        }
        const ismatch= await bcrypt.compare(password,client.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid Password"});
        }
        const token = jwt.sign(
            {id:client._id,role:client.role},
            process.env.JWT,
            {expiresIn:"1d"}
        );
        res.json({
            token,
            client:{
                id:client._id,
                name:client.name,
                email:client.email,
                role:client.role
            }
        });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});
router.get("/dashboard",auth,async(req,res)=>{
    const client = await Client.findById(req.client.id);
    res.json({
        msg:"Welcome To Dashboard",
        client:client
    });
});
module.exports=router;