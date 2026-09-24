const express=require("express");
const router=express.Router();
const Project=require("../models/project");
const auth=require("../middleware/auth");
const admin= require("../middleware/admin");
const project = require("../models/project");
const upload = require("../middleware/upload");
const client = require("../models/client");
router.post("/create",auth,upload.single("file"),async(req,res)=>{
    try{
        const {title,description,budget}=req.body;
        if(!title||!description||!budget||!req.file){
            return res.status(400).json({
                msg:"All Field Required"
            });
        }
        const newproject = new Project({
            title,
            description,
            budget,
            client:req.client.id,
            userFile:req.file ? req.file.filename:null,
            status:"pending"
        });
        await newproject.save();
        res.json({msg:"Project Created Successfully"});
    }
    catch(err){
        res.status(500).json({msg:err.message});
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
router.get("/admin/stats",auth,admin,async(req,res)=>{
    try{
        const TotalUser=await client.countDocuments();
        const TotalProjects=await project.countDocuments();
        const PendingProjects=await project.countDocuments({
            status:"pending"
        })
        const InprogressProject=await project.countDocuments({
            status:"Inprogress"
        });
        const Completed=await project.countDocuments({
            status:"completed"
        }) 
        res.json({
            users:TotalUser,
            projects:TotalProjects,
            pending:PendingProjects,
            inprogress:InprogressProject,
            completed:Completed
        })
    }catch(err){
        console.log(err)
    }
});
router.put("/update/:id", auth,admin, async (req, res) => {
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
router.post("/upload-user",auth,upload.single("file"),async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id);
        if(!project){
            return res.status(404).json({message:"Project Not Found"});
        }
        if(!req.file){
            return res.state(404).json({message:"No file Uploaded"});
        }
        project.userFile=req.file.filename;
        project.status="pending-review";

        await project.save();
        res.json({
            msg:"File Uploaded Successfully",
            file:project.userFile
        });
    }
    catch(err){
        console.log(err);   
    }
}
)
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
router.delete("/project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ msg: "Project deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/admin/projects", auth, admin, async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ _id: -1 });

        res.json(projects);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Failed to fetch projects"
        });
    }
});
module.exports=router;