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
            <h1 className="text-2xl font-bold">Create Your Project</h1>

            <form className="Form"onSubmit={handlesubmit}>
                
                <label>Title </label>
                <input
                    name="title"
                    className="mt-6 ml-14 p-2 border rounded shadow text-slate-950 w-96         "
                    placeholder="Enter Your Project Title"
                    value={form.title}
                    onChange={handlechange}
                /><br/>

                <label>Description </label>
                <input
                    name="description"
                    className="mt-2 ml-1 p-2 border rounded shadow text-slate-900 w-96"
                    placeholder="Enter Your Project description"
                    value={form.description}
                    onChange={handlechange}
                /><br/>

                <label>Budget </label>
                <input
                    name="budget"
                    type="number"
                    className="mt-2 p-2 ml-9 border rounded shadow text-slate-900 w-96"
                    placeholder="Enter Your Project Budget"
                    value={form.budget}
                    onChange={handlechange}
                /><br/>

                <label className="mr-20">File </label>
                <input
                    type="file"
                    className="mt-2 justify-center fy-text-slate-900"
                    onChange={handleFile} // ✅ correct handler
                /><br/>

                <button className="Submit"type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Upload;