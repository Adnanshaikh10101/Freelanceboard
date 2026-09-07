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
        <section className="bg-[#0f0258] py-16">
  <div className="max-w-6xl mx-auto text-center text-white">

    {/* Heading */}
    <h2 className="text-4xl font-bold mb-12">Why Choose FreelanceBoard</h2>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

      {/* CARD 1 */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
        <div className="text-5xl mb-4">💻</div>
        <h3 className="text-2xl font-bold mb-2">Dynamic Websites</h3>
        <p className="text-gray-300">
          Get fully responsive and modern websites built with the latest technologies.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
        <div className="text-5xl mb-4">💰</div>
        <h3 className="text-2xl font-bold mb-2">Affordable Price</h3>
        <p className="text-gray-300">
          High-quality work at budget-friendly prices suitable for everyone.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
        <div className="text-5xl mb-4">⚡</div>
        <h3 className="text-2xl font-bold mb-2">Fastest Delivery</h3>
        <p className="text-gray-300">
          Get your projects completed quickly without compromising quality.
        </p>
      </div>

    </div>
  </div>
</section>
<footer className="bg-[#0f0258] text-gray-300 mt-10">
  <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

    {/* LOGO / ABOUT */}
    <div>
      <h2 className="text-2xl font-bold text-white mb-3">FreelanceBoard</h2>
      <p className="text-sm">
        Connect with top freelancers and get your projects done quickly and affordably.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
      <ul className="space-y-2">
        <li className="hover:text-fuchsia-400 cursor-pointer">Home</li>
        <li className="hover:text-fuchsia-400 cursor-pointer">Upload Project</li>
        <li className="hover:text-fuchsia-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-fuchsia-400 cursor-pointer">Login</li>
      </ul>
    </div>

    {/* SERVICES */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
      <ul className="space-y-2">
        <li>Web Development</li>
        <li>UI/UX Design</li>
        <li>App Development</li>
        <li>SEO Optimization</li>
      </ul>
    </div>

    {/* CONTACT */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
      <p>Email: support@freelanceboard.com</p>
      <p>Phone: +91 98765 43210</p>

      {/* SOCIAL ICONS */}
      <div className="flex gap-4 mt-4 text-xl">
        <span className="hover:text-fuchsia-400 cursor-pointer">🌐</span>
        <span className="hover:text-fuchsia-400 cursor-pointer">🐦</span>
        <span className="hover:text-fuchsia-400 cursor-pointer">💼</span>
      </div>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-gray-700 text-center py-4 text-sm">
    © 2026 FreelanceBoard. All rights reserved.
  </div>
</footer>
        </div>   
    );
}
export default Home;