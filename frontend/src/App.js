import { BrowserRouter,Routes,Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
function App(){
  return(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/upload" element={
      <ProtectRoute><Upload/></ProtectRoute>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;