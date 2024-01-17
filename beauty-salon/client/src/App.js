import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from './pages/list/List';
import Service from "./pages/service/Service";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Admin from "./pages/admin/admin";
import Statistics from "./pages/admin/statistics";
import AddService from "./pages/admin/addService";
import EditService from "./pages/admin/editService";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/services" element={<List/>}/>
        <Route path="/services/:id" element={<Service/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="admin/statistics" element={<Statistics/>}/>
        <Route path="admin/addservice" element={<AddService/>}/>
        <Route path="admin/editservice" element={<EditService/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
