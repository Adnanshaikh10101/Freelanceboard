import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Dashboard() {
  const [client, setclient] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch Client
  const fetchclient = async () => {
    try {
      const res = await API.get("/dashboard");
      setclient(res.data.client);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Fetch Projects
  const fetchfiles = async () => {
    try {
      const res = await API.get("/my-projects");
      setFiles(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/project/${id}`); // 🔥 make sure backend route exists
      setFiles(files.filter((file) => file._id !== id)); // update UI
      alert("Project deleted successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchfiles();
    fetchclient();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#0a012f] text-white p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        {client ? (
          <h1 className="text-3xl font-bold">
            Welcome, <span className="text-fuchsia-400">{client.name}</span> 👋
          </h1>
        ) : (
          <p className="text-gray-400">Loading user...</p>
        )}
      </div>

      {/* TITLE */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Projects</h2>

        <button
          onClick={() => navigate("/upload")}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-5 py-2 rounded-lg font-medium transition"
        >
          + New Project
        </button>
      </div>

      {/* PROJECT CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold mb-2 text-fuchsia-300">
                {file.title}
              </h3>

              <p className="text-gray-300 text-sm mb-3">
                {file.description || "No description provided"}
              </p>

              <p className="text-sm mb-2">
                💰 Budget:{" "}
                <span className="text-green-400 font-semibold">
                  ₹{file.budget || "N/A"}
                </span>
              </p>

              <p className="text-sm mb-4">
                📌 Status:{" "}
                <span className="text-yellow-400 capitalize">
                  {file.status || "pending"}
                </span>
              </p>

              {/* ❌ Removed View Button */}

              {/* ✅ DELETE BUTTON */}
              <button
                onClick={() => handleDelete(file._id)}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Delete Project
              </button>

            </div>
          ))
        ) : (
          <p className="text-gray-400">No projects found.</p>
        )}

      </div>
    </div>
  );
}

export default Dashboard;