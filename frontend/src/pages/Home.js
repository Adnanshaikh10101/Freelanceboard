import "../index.css";
import bgimg from "../assets/hero.png";
function Home(){
    return(
        <div className="max-w-6xl mx-auto mt-10 border rounded shadow h-screen bg-cover p-4 flex " style={{
            backgroundImage:`url(${bgimg})`,
            backgroundSize:"cover",
            backgroundPosition:"center-top" }}>
            <div className="w-1/2 mx-1 text-fuchsia-600 border rounded shadow p-6">
                <h1>Made Your Website</h1>
            </div>
             <div className="w-1/2 mx-1 text-fuchsia-600 border rounded shadow p-6">
                <h1>Made Your Website</h1>
            </div>   
        </div>
    );
}
export default Home;