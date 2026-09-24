import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        users: 0,
        projects: 0,
        pending: 0,
        inprogress: 0,
        completed: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/admin/stats");

                setStats(res.data);

            } catch (err) {
                console.log(err.response?.data || err.message);

                if (err.response?.status === 403) {
                    navigate("/dashboard");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a012f] text-white flex items-center justify-center">
                <h2 className="text-xl">Loading Admin Dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a012f] text-white">

            {/* Header */}
            <header className="bg-white/10 backdrop-blur-md p-5 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-fuchsia-400">
                    FreelanceBoard Admin
                </h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </header>

            <div className="p-6">

                {/* Welcome */}
                <h2 className="text-3xl font-bold mb-2">
                    Admin Dashboard
                </h2>

                <p className="text-gray-400 mb-8">
                    Manage your FreelanceBoard platform
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

                    <div className="bg-white/10 p-6 rounded-xl">
                        <p className="text-gray-400">Users</p>
                        <h3 className="text-3xl font-bold text-fuchsia-400">
                            {stats.users}
                        </h3>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl">
                        <p className="text-gray-400">Projects</p>
                        <h3 className="text-3xl font-bold text-blue-400">
                            {stats.projects}
                        </h3>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl">
                        <p className="text-gray-400">Pending</p>
                        <h3 className="text-3xl font-bold text-yellow-400">
                            {stats.pending}
                        </h3>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl">
                        <p className="text-gray-400">In Progress</p>
                        <h3 className="text-3xl font-bold text-orange-400">
                            {stats.inprogress}
                        </h3>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl">
                        <p className="text-gray-400">Completed</p>
                        <h3 className="text-3xl font-bold text-green-400">
                            {stats.completed}
                        </h3>
                    </div>

                </div>

                {/* Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

                    <button
                        onClick={() => navigate("/admin/projects")}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 p-6 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold">
                            📁 Manage Projects
                        </h3>

                        <p className="text-gray-200 mt-2">
                            View projects, change status and manage files.
                        </p>
                    </button>

                    <button
                        onClick={() => navigate("/admin/users")}
                        className="bg-blue-600 hover:bg-blue-700 p-6 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold">
                            👥 Manage Users
                        </h3>

                        <p className="text-gray-200 mt-2">
                            View and manage registered users.
                        </p>
                    </button>

                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;