
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

function AdminProjects() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await API.get("/admin/projects");
            setProjects(res.data);
        } catch (err) {
            console.log(err.response?.data || err.message);

            if (err.response?.status === 403) {
                navigate("/dashboard");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`/project/${id}`);

            alert("Project deleted successfully");

            fetchProjects();
        } catch (err) {
            console.log(err.response?.data || err.message);

            alert(
                err.response?.data?.msg ||
                "Failed to delete project"
            );
        }
    };

    const updateProject = async (project) => {
        const title = window.prompt(
            "Enter project title:",
            project.title
        );

        if (title === null || title.trim() === "") {
            return;
        }

        const status = window.prompt(
            "Enter status: pending / Inprogress / Completed",
            project.status
        );

        if (status === null || status.trim() === "") {
            return;
        }

        try {
            await API.put(`/update/${project._id}`, {
                title: title,
                status: status
            });

            alert("Project updated successfully");

            fetchProjects();
        } catch (err) {
            console.log(err.response?.data || err.message);

            alert(
                err.response?.data?.error ||
                "Failed to update project"
            );
        }
    };

    const uploadProject = async (id, file) => {
        if (!file) {
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {
            await API.post(
                `/upload/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("File uploaded successfully");

            fetchProjects();
        } catch (err) {
            console.log(err.response?.data || err.message);

            alert(
                err.response?.data?.error ||
                "Failed to upload file"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a012f] text-white flex items-center justify-center">
                <h2 className="text-xl">
                    Loading Projects...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a012f] text-white">

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

            <main className="p-6">

                <h2 className="text-3xl font-bold mb-2">
                    Manage Projects
                </h2>

                <p className="text-gray-400 mb-8">
                    View and manage all client projects
                </p>

                {projects.length === 0 ? (

                    <div className="bg-white/10 rounded-xl p-10 text-center">

                        <h3 className="text-xl font-bold">
                            No Projects Found
                        </h3>

                        <p className="text-gray-400 mt-2">
                            There are no projects available.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {projects.map((project) => (

                            <div
                                key={project._id}
                                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
                            >

                                <h3 className="text-2xl font-bold text-fuchsia-400">
                                    {project.title}
                                </h3>

                                <p className="text-gray-300 mt-3">
                                    {project.description}
                                </p>

                                <div className="mt-5 space-y-2">

                                    <p>
                                        <span className="text-gray-400">
                                            Budget:
                                        </span>{" "}
                                        ₹{project.budget}
                                    </p>

                                    <p>
                                        <span className="text-gray-400">
                                            Client:
                                        </span>{" "}
                                        {project.client}
                                    </p>

                                    <p>
                                        <span className="text-gray-400">
                                            Status:
                                        </span>{" "}
                                        <span className="text-yellow-400">
                                            {project.status}
                                        </span>
                                    </p>

                                    {project.userFile && (
                                        <p>
                                            <span className="text-gray-400">
                                                Client File:
                                            </span>{" "}
                                            {project.userFile}
                                        </p>
                                    )}

                                    {project.file && (
                                        <p>
                                            <span className="text-gray-400">
                                                Completed File:
                                            </span>{" "}
                                            <span className="text-green-400">
                                                {project.file}
                                            </span>
                                        </p>
                                    )}

                                </div>

                                <div className="flex flex-wrap gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            updateProject(project)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                    >
                                        ✏️ Update
                                    </button>

                                    <label className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer">

                                        📤 Upload

                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) =>
                                                uploadProject(
                                                    project._id,
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                    </label>

                                    <button
                                        onClick={() =>
                                            deleteProject(project._id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminProjects;
