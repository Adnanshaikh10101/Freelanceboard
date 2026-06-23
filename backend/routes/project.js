const express=require("express");
const router=express.Router();
const Project=require("../models/project");
const auth=require("../middleware/auth");
const project = require("../models/project");
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
router.get("/my-projects",auth,async(req,res)=>{
    try{
        const projects=await Project.find({client:req.client.id});
        res.json(projects);
    }catch(err){
        res.status(500).json({error:err.msg});
    }
});
router.get("/all",auth,async(req,res)=>{
    try{
        const projects=await Project.find().populate("client","name email");
        res.json(projects);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.put("/update/:id",auth,async(req,res)=>{
    try{
        const {status}=req.body;
        const project=await Project.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        );
        res.json(project);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});
module.exports=router;