import "../index.css";
import bgimg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();
    const handleHome = async() =>{
    navigate("/login");
}
    return(
        <div className="">
        <div className="max-w-6xl mx-auto mt-10 border rounded-lg h-screen bg-cover p-4 flex" style={{
            backgroundImage:`url(${bgimg})`,
            backgroundSize:"cover",
            backgroundPosition:"center-right" }}>
            <div className="w-1/3 flex text-fuchsia-600 border-none p-2 h-36">
                <h1 className="text-6xl font-extrabold font-mono text-white mr-80">Made Your Website
                    <button className="rounded bg-fuchsia-600 font-bold text-2xl p-3" onClick={handleHome}>Get Started</button>
                </h1>
                <h1 className="text-6xl font-extrabold font-mono text-white mx-72"><span className="text-6xl font-extrabold font-mono text-white whitespace-nowrap">At Very</span><br/>Low Cost</h1>
            </div>   
        </div>
        <section>
            <div className=" bg-[#0f0258] max-w-6xl mt-2 mx-auto flex justify-center items-center">
            <div className="grid grid-cols-3 gap-2">
                <div className="border h-72 w-[380px] rounded-lg ">
                    <h2 className="leading-tight font-extrabold text-2xl mx-2">Dynamic Websites</h2>
                </div>
                <div className="border h-72 w-[380px] rounded-lg flex">                    
                    <h2 className="leading-tight font-extrabold text-2xl mx-2">Affordable Price</h2>
                </div>
                <div className="border  h-72 w-[380px] rounded-lg flex">
                    <h2 className="leading-tight font-extrabold text-2xl mx-2">Fastest Delivery</h2>
                </div>
            </div>
            </div>
        </section>
        </div>
        
    );
}
export default Home;