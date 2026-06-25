const express=require("express");
const router=express.Router();
const Project=require("../models/project");
const auth=require("../middleware/auth");
const admin= require("../middleware/admin");
const project = require("../models/project");
const upload = require("../middleware/upload");
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
router.get("/all",auth,admin,async(req,res)=>{
    try{
        const projects=await Project.find().populate("client","name email");
        res.json(projects);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.put("/update/:id", auth, async (req, res) => {
    try {
        const { status ,title} = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {title,status},
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post("/upload/:id",auth,admin,upload.single("file"),async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id);
        project.file=req.file.filename;
        project.status="Completed";
        await project.save();
        res.json({
            msg:"File Uploaded Successfully",
            file:project.file
        });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});
module.exports=router;