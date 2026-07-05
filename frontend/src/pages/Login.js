import { useNavigate } from "react-router-dom";
import React , {useState} from "react";
import API from "../services/api";
import "../index.css";
function Login(){
    const navigate = useNavigate();
    const [form ,setform] = useState({
        email:"",
        password:""
    });
    const handlelogin = async()=>{
        try{
            const res = await API.post("/login",form);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("role",res.data.client.role);
            alert("Login Successfull");
            navigate("/dashboard");
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="Login">
            <h2>Login</h2>
            <input placeholder="Enter Your Email" onChange={(e)=>setform({...form,email:e.target.value})}/>
            <input placeholder="Enter Your Password" 
            type="password" onChange={(e)=>setform({...form,password:e.target.value})}/>
            <button onClick={handlelogin}>Login</button>
        </div>
    );
}
export default Login;