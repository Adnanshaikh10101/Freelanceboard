import React,{useEffect,useState } from "react";
import API from "../services/api";
import {useNavigate } from "react-router-dom";
import "../index.css";
function Dashboard(){
    const [files,setFiles]= useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const fetchfiles = async () => {
    try {
        const res = await API.get("/my-projects");
        setFiles(res.data);
    } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
    }
    };
    useEffect(()=>{
        if(!token){
            navigate("/login");
            return;
    }
        fetchfiles();
    },[token,navigate]);
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
        </div>
    </div>
);
}
export default Dashboard;