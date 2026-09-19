import { useState,useEffect } from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";
function Admin(){
    const navigate=useNavigate();
    const [Stats,SetStats]=useState({
        users:0,
        projects:0,
        pending:0,
        incomplete:0,
        completed:0
    })
    const [loading,setloading]=useState(true);
    const fetchstats=async()=>{
        try{
            const res = await API.get("/admin/stats");
            SetStats(res.data);
        }catch(err){
            console.log(err.response?.data||err.message);
            if(err.response?.status===403){
                navigate("/dashboard");
            }
        }
        finally{
            setloading(false);
        };
    }
    useEffect(()=>{
        fetchstats();
    });
    if(loading){
        return(<div className="min-h-screen bg-[#0a012f] flex items-center justify-center">
            <h3 className="text-2xl">Loading Admin Dashboard........</h3>
        </div>)
    }
    return(
        <div className="Admin Page">
            <h3>{Stats.users}</h3>
            <h3>{Stats.projects}</h3>
        </div>
    )
}
export default Admin;