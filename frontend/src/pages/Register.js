import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../index.css";
function Register(){
    const navigate = useNavigate(); 
    const [error,setError]=useState("");
    const [form,setform] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try{
            await API.post("/register",form)
            alert("User Register succesfully");
            navigate("/login");
        }
        catch(err){
            console.log(err.response?.data);
            setError(
                err.response?.data?.message||"Something Went Wrong"
            );
        }
    };
    return(
        <form className="flex justify-center" onSubmit={handleSubmit}>
            <div className="p-12 text-center mt-24  w-full">
            <h2 className="text-2xl  font-bold mb-4"> Register </h2>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black"placeholder="Enter Your Name" onChange={(e)=> setform({...form,name:e.target.value})}/><br/>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" placeholder="Enter Your Email" onChange={(e)=> setform({...form,email:e.target.value})}/><br/>
            <input className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" placeholder="Enter Your Password" onChange={(e)=>setform({...form,password:e.target.value})}/><br/>
            {error && (
                <p className="text-sm font-bold text-red-700 mb-4">{error}</p>
            )}
            <button className="font-semibold bg-purple-600 w-80 border rounded shadow text-white p-2 border-none hover:bg-green-700">Register</button>
        </div>
        </form>
    );
}
export default Register;
