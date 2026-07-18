import API from "../services/api";
import "../index.css";
import { useState } from "react";

function Upload() {
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        budget: ""
    });

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(); // ✅ correct
        data.append("title", form.title);
        data.append("description", form.description);
        data.append("budget", form.budget);
        if (file) data.append("file", file);

        try {
            const res = await API.post("/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert(res.data.msg);

            // reset
            setForm({ title: "", description: "", budget: "" });
            setFile(null);

        } catch (err) {
            console.log(err);
            alert("Upload failed");
        }
    };

    return (
        <div className="p-3">
            <h1 className="text-2xl font-bold">Create Your Project Here</h1>

            <form onSubmit={handlesubmit}>
                
                <label>Title </label>
                <input
                    name="title"
                    className="mt-2 text-slate-950"
                    placeholder="Enter Your Project Title"
                    value={form.title}
                    onChange={handlechange}
                /><br/>

                <label>Description </label>
                <input
                    name="description"
                    className="text-slate-900"
                    placeholder="Enter Your Project description"
                    value={form.description}
                    onChange={handlechange}
                /><br/>

                <label>Budget </label>
                <input
                    name="budget"
                    type="number"
                    className="text-slate-900"
                    placeholder="Enter Your Project Budget"
                    value={form.budget}
                    onChange={handlechange}
                /><br/>

                <label>File </label>
                <input
                    type="file"
                    className="text-slate-900"
                    onChange={handleFile} // ✅ correct handler
                /><br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Upload;