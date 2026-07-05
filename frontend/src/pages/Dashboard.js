import React,{useEffect,useState } from "react";
import API from "../services/api";
import { Navigate,useNavigate } from "react-router-dom";
import "../index.css";
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
    return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Files</h2>

        <div className="grid grid-cols-3 gap-4">
            {files.map((file) => (
                <div className="p-4 border rounded shadow">
                    <p className="font-semibold">{file.title}</p>

                    <a 
                        className="text-blue-500"
                        href={`http://localhost:5000/${file.path}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View
                    </a>
                </div>
            ))}
            <button onClick={handlelogout}>Logout</button>
        </div>
    </div>
);
}
export default Dashboard;