import React,{useState} from "react";
import API from "../services/api";
import e from "cors";
function Register(){
    const [form,setform] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleSubmit = async()=>{
        try{
            await API.post("/register",form)
            alert("User Register succesfully");
        }
        catch(err){
            console.log(err)
        }
    };
    return(
        <div className="Register">
            <h2> Register </h2>
            <input placeholder="Enter Your Name" onChange={(e)=> setform({...form,name:e.target.value})}/>
            <input placeholder="Enter Your Email" onChange={(e)=> setform({...form,email:e.target.value})}/>
            <input placeholder="Enter Your Password" onChange={(e)=>setform({...form,password:e.target.value})}/>
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}
export default Register;
