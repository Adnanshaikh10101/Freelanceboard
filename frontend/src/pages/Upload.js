import React,{useState} from "react";
import API from "../services/api";
function Upload(){
    const [file,setfile] = useState(null);
    const handleupload = async()=>{
        const formData = new FormData();
        formData.append("file",file);
        try{
            const res = await API.post("/upload",formData);
            alert("Uploaded Successfully");
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
return(
    <div className="Upload">
        <h2>Upload File</h2>
        <input type="file" onChange={(e)=> setfile(e.target.files[0])}/>
        <button onClick={handleupload} >Upload</button>
    </div>
);
}
export default Upload;