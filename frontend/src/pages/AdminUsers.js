import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

function AdminUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const deleteuser=async(id)=>{
        const confirmdelete=window.confirm(
            "Are you sure you want to delete this user"
        );
        if(!confirmdelete){
            return;
        }
        try{
        const res=await API.delete(`/admin/user/${id}`);
        alert(res.data.msg);
        setUsers((prevUsers)=>
            prevUsers.filter((user)=>user._id!==id)
        );
        }catch(err){
    console.log(err.response?.data || err.message);

    alert(
        err.response?.data?.msg ||
        "Failed to delete user"
    );
}
    }

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const res = await API.get("/admin/user");

                setUsers(res.data);

            } catch (err) {

                console.log(
                    err.response?.data || err.message
                );

                if (err.response?.status === 403) {
                    navigate("/dashboard");
                }

            } finally {

                setLoading(false);

            }
        };

        fetchUsers();

    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a012f] text-white flex items-center justify-center">

                <h2 className="text-xl">
                    Loading Users...
                </h2>

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
                    onClick={() => navigate("/admin")}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-lg"
                >
                    ← Back
                </button>

            </header>


            {/* Main */}

            <main className="p-6">

                <h2 className="text-3xl font-bold mb-2">
                    Manage Users
                </h2>

                <p className="text-gray-400 mb-8">
                    View all registered clients
                </p>


                {users.length === 0 ? (

                    <div className="bg-white/10 rounded-xl p-10 text-center">

                        <h3 className="text-xl font-bold">
                            No Users Found
                        </h3>

                        <p className="text-gray-400 mt-2">
                            There are no registered users.
                        </p>

                    </div>

                ) : (

                    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-white/10">

                                    <tr>

                                        <th className="text-left p-4">
                                            #
                                        </th>

                                        <th className="text-left p-4">
                                            Name
                                        </th>

                                        <th className="text-left p-4">
                                            Email
                                        </th>

                                        <th className="text-left p-4">
                                            Role
                                        </th>

                                        <th className="text-left p-4">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((user, index) => (

                                        <tr
                                            key={user._id}
                                            className="border-t border-white/10 hover:bg-white/5"
                                        >

                                            <td className="p-4">
                                                {index + 1}
                                            </td>

                                            <td className="p-4 font-medium">
                                                {user.name}
                                            </td>

                                            <td className="p-4 text-gray-300">
                                                {user.email}
                                            </td>

                                            <td className="p-4">

                                                <span className="bg-fuchsia-600/20 text-fuchsia-400 px-3 py-1 rounded-full text-sm">
                                                    {user.isAdmin
                                                        ? "Admin"
                                                        : "Client"}
                                                </span>

                                            </td>

                                            <td className="p-4">

                                                <button
                                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                                    onClick={()=>deleteuser(user._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminUsers;