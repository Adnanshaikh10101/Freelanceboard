import React, { useState, useEffect} from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Upload(){
    const navigate = useNavigate();
     const role = localStorage.getItem("role");
        if(role!=="admin"){
            alert("Only Admin Can Access!");
            navigate("/dashboard");
        }
    const [file, setfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    // ✅ Fetch all projects
    useEffect(()=>{
        fetchProjects();
    },[]);

    const fetchProjects = async()=>{
        try{
            const res = await API.get("/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setProjects(res.data);
        }
        catch(err){
            console.log(err.response?.data);
        }
    };

    // ✅ Upload file
    const handleupload = async()=>{
        if(!file || !selectedProject){
            alert("Select project and file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try{
            const res = await API.post(`/upload/${selectedProject}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Uploaded Successfully");
            console.log(res.data);

        }
        catch(err){
            console.log(err.response?.data);
        }
    }

    return(
        <div className="Upload">
            <h2>Upload File</h2>

            {/* ✅ Select Project */}
            <select onChange={(e)=> setSelectedProject(e.target.value)}>
                <option value="">Select Project</option>
                {projects.map((project)=>(
                    <option key={project._id} value={project._id}>
                        {project.title}
                    </option>
                ))}
            </select>

            <br/><br/>

            {/* ✅ File Input */}
            <input 
                type="file" 
                onChange={(e)=> setfile(e.target.files[0])}
            />

            <br/><br/>

            <button onClick={handleupload}>
                Upload
            </button>
        </div>
    );
}

export default Upload;