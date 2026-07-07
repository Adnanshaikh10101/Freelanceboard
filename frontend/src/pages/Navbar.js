import { Link, } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

function Navbar() {
    return (
        <div className="navbar">
            <img src={logo} alt="logo" width="100"/>    
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/upload">Admin</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Navbar;