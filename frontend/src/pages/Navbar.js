import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="navbar">
            <img src={logo} alt="logo" width="100"/>    
            <div className="nav-links">
                <Link to="/upload">Upload</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;