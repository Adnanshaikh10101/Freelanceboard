const mongoose=require("mongoose");
const client = require("./client");
const projectSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        type:String,
        required:true
    },
    budget:{
        type:Number
    },
    status:{
        type:String,
        default:"pending"
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"clients"
    },
    file:{
      type:String  
    }
},{timestamps:true});
module.exports=mongoose.model("project",projectSchema);