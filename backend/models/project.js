const mongoose=require("mongoose");
const client = require("./client");
const projectSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        type:String
    },
    budget:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"clients"
    },
    userFile:{
        type:String
    },
    file:{
      type:String,
      required:true
    }
},{timestamps:true});
module.exports=mongoose.model("project",projectSchema);