import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../index.css";
function Register(){
    const navigate = useNavigate(); 
    const [form,setform] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleSubmit = async()=>{
        try{
            await API.post("/register",form)
            alert("User Register succesfully");
            navigate("/login");
        }
        catch(err){
            console.log(err)
        }
    };
    return(
        <div className="flex justify-center">
            <div className="p-12 text-center mt-24  w-full">
            <h2 className="text-2xl  font-bold mb-4"> Register </h2>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black"placeholder="Enter Your Name" onChange={(e)=> setform({...form,name:e.target.value})}/><br/>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" placeholder="Enter Your Email" onChange={(e)=> setform({...form,email:e.target.value})}/><br/>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" placeholder="Enter Your Password" onChange={(e)=>setform({...form,password:e.target.value})}/><br/>
            <button className="font-semibold bg-purple-600 w-80 border rounded shadow text-white p-2 border-none hover:bg-green-700" onClick={handleSubmit}>Register</button>
        </div>
        </div>
    );
}
export default Register;
