import { useEffect,useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css";
function Dashboard(){
const [client,setclient]=useState(null)
const [files,setfiles]=useState([])
const navigate=useNavigate();
const token=localStorage.getItem("token");

const handledelete=async(id)=>{
  const confirmdelete=window.confirm("Confirm Delete!");
  if(!confirmdelete) return;
  try{
    await API.delete(`/project/${id}`);
    setfiles(files.filter((file)=>file._id !==id));
    alert("Project deleted Successfully");
  }
  catch(err){
    console.log(err)
  }
}

const Fetchclient=async()=>{
  try{
    const res=await API.get("/dashboard");
    setclient(res.data.client)
  }
  catch(err){
    console.log(err)
  }
}
const Fetchfiles=async()=>{
  try{
    const res=await API.get("/my-projects");
    setfiles(res.data)
  }
  catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  if(!token){
    navigate("/login")
    return
  }
  Fetchclient();
  Fetchfiles();
},[token,navigate]);
return(
  <div className="min-h-screen text-white p-6">
    <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
      {client ? (
      <h2 className="text-3xl font-bold">
        Welcome,{" "}
        <span className="text-fuchsia-400">{client.name}</span></h2>
    ):(
      <p>Loading User......</p>
    )}
         <button 
      onClick={()=>{navigate("/upload")}}
      className="bg-fuchsia-600 font-semibold px-5 py-1 rounded transition hover:bg-fuchsia-700">
      New Project
      </button>
      </div>
    
      {/*<h2 className="max-w-6xl mx-auto mb-8 text-2xl font-bold">Your Projects</h2>*/}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          files.length>0 ?
          (
            files.map((file)=>(
              <div key={file._id}
              className="bg-purple-700 p-5 rounded-lg hover:bg-purple-600">
                <h3 className="text-xl mb-2 font-bold last:text-fuchsia-300">{file.title}</h3>
                <h3 className="text-gray-300 text-sm mb-3">{file.description || "No Description Provided"}</h3>
                <h3 className="text-sm mb-2">
                  budget: {" "}
                  <span className="text-green-400 font-semibold">{file.budget || "N/A"}</span>
                </h3>
                <h3 className="text-sm mb-2">status:{" "}
                  <span className="text-green-400 text-sm font-bold">{file.status||"pending"}</span>
                </h3>
                {file.userFile ?(
                  <div className="mb-3">
                    {file.userFile.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                      <img
                      src={`https://localhost:5000/upload/${file.userFile}`}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-md mb-2"></img>
                    )
                    :(<p className="text-gray-400 mb-2">
                      {file.userFile}
                    </p>
                    )}
                    <div className="flex gap-2">
                      <a
                      href={`https://localhost:5000/uploads/{file.userFile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center text-sm bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-2 rounded-lg"
                      >View</a>
                      <button
                        onClick={()=>handledelete(file._id)}
                        className="flex-1 text-center text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg">
                          Delete
                      </button>
                    </div>
                  </div>
                ):(
                  <div><p>No File uploaded</p></div>
                )}
              </div>


          ))):(<p>hi</p>)
        }
      </div>
  </div>
  
  )
}
export default Dashboard;