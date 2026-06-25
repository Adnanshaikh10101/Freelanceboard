require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app=express();
const project = require("./routes/project");
const routes=require("./routes/routes");
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API Runnning Successfully");
});
app.use("/api",project);
app.use("/api",routes);
app.use("/upload",express.static("upload"));
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongoose Working"))
.catch(err=>console.log(err));
const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Server Running on ", PORT);
});