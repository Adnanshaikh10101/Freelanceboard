const express=require("express");
const router=express.Router();
const Project=require("../models/project");
const auth=require("../middleware/auth");
router.post("/create",auth,async(req,res)=>{
    try{
        const {title,description,budget}=req.body;
        const newproject = new Project({
            title,
            description,
            budget,
            client:req.client.id
        });
        await newproject.save();
        res.json({msg:"Project Created Successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});