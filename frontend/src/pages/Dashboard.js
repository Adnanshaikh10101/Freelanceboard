import React,{useEffect,useState } from "react";
import API from "../services/api";
import { Navigate,useNavigate } from "react-router-dom";
function Dashboard(){
    const [files,setFiles]= useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        fetchfiles();
    },[]);
    if(!token){
        return(<Navigate to="/login"/>)
    }
    const handlelogout = async()=>{
        localStorage.removeItem("token");
        alert("Logout Successfully");
        navigate("/login")
    }
    const fetchfiles = async () => {
    try {
        const res = await API.get("/my-projects");
        setFiles(res.data);
    } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
    }
};
    return(
    <div className="dashboard">
    <h2>All Projects</h2>
    {files.map((file)=>(
        <div key={file._id}>
            <p>{file.file}</p>
            <a 
            href={`http://localhost:5000/${file.path}`}
            target="_blank"
            rel="noreferrer"
            >View Projects</a>
        </div>
    ))}
    <button onClick={handlelogout}>Logout</button>
    </div>
    );
}
export default Dashboard;