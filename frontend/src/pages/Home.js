import "../index.css";
import bgimg from "../assets/hero.png";
function Home(){
    return(
        <div className="max-w-6xl mx-auto mt-10 border rounded shadow h-screen bg-cover p-4 flex" style={{
            backgroundImage:`url(${bgimg})`,
            backgroundSize:"cover",
            backgroundPosition:"center-right" }}>
            <div className="w-1/3 flex text-fuchsia-600 border-none p-2 h-36">
                <h1 className="text-6xl font-extrabold font-mono text-white mr-80">Made Your Website</h1>
                <h1 className="text-6xl font-extrabold font-mono text-white mx-72"><span className="text-6xl font-extrabold font-mono text-white whitespace-nowrap">At Very</span><br/>Low Cost</h1>
            </div>   
        </div>
    );
}
export default Home;