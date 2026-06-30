import { BrowserRouter,Routes,Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Register from "./pages/Register";
function App(){
  <BrowserRouter>
  <Routes>
    <Route path="/Register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
}
export default App;