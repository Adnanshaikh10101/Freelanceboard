import { useNavigate } from "react-router-dom";
import React , {useState} from "react";
import API from "../services/api";
import "../index.css";
function Login(){
    const navigate = useNavigate();
    const [error,seterror]=useState("");
    const [form ,setform] = useState({
        email:"",
        password:""
    });
    const handlelogin = async(e)=>{
        e.preventDefault();
        seterror("");
        try{
            const res = await API.post("/login",form);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("role",res.data.client.role);
            alert("Login Successfull");
            navigate("/dashboard");
        }
        catch(err){
            console.log(err.response?.data);
            seterror(
                err.response?.data?.message||"Something Went Wrong"
            );
        }
    }
    return(
        <form className="flex justify-center items-center" onSubmit={handlelogin}>
            <div className="p-12 text-center mt-24 w-full">
            <h2 className="text-2xl  font-bold mb-4">LOGIN</h2>
            <input 
            className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" 
            placeholder="Enter Your Email" 
            onChange={(e)=>setform({...form,email:e.target.value})}/><br/>
            <input 
            className="p-2 border rounded shadow w-80 mb-6 font-semibold text-black" 
            placeholder="Enter Your Password" 
            type="password" 
            onChange={(e)=>setform({...form,password:e.target.value})}/><br/>
            {error &&(
                <p className="text-sm text-red-700 font-bold mb-4">{error}</p>
            )}
            <button className=" font-semibold bg-purple-600 w-80 border rounded shadow text-white p-2 border-none hover:bg-green-700" type="submit">Login</button>
        </div>  
        </form>
        
    );
}
export default Login;