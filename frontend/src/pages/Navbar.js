import { Link, } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
    const [client,Setclient]=useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const fetchclient = async()=>{
        const res= await API.get("/dashboard");
        Setclient(res.data.client);
    }
    const handlelogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
        window.location.reload();
    }
    useEffect(()=>{
        if(token){
            fetchclient();
        }
    },[token])
    return (
        <div className="navbar">
            <img src={logo} alt="logo" width="100"/>    
            <div className="nav-links">
                {client &&(
                    <p className="text-fuchsia-600 font-semibold">Welcome,{client.name}</p>
                )
            }
                <Link to="/">Home</Link>
                {role==="admin" ? (
                    <>
                    <Link to="/upload">Admin</Link>
                    </>
                ):(
                    <>
                    <Link to="/upload">upload</Link>
                    </>
                )
                }
                <Link to="/dashboard">Dashboard</Link>
                {!token ? (
                    <>
                    <Link className="border rounded shadow w-32 text-center" to="/login">Login</Link>
                    <Link className=" text-center bg-purple-600 w-40 rounded hover:bg-purple-700" to="/register">Sign Up</Link>
                    </>
                ) : (
                    <>

                    <button className="font-semibold bg-purple-600 w-40 rounded  hover:bg-purple-700" onClick={handlelogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;