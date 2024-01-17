import React from 'react';
import './admin.css';
import { useNavigate } from "react-router-dom";

const Admin = () =>{
    const navigate = useNavigate()
    return (
        <div>
            <div className="adminContainer">
                <button onClick={()=>navigate("/admin/statistics")}>Statystyki</button>
                <button onClick={()=>navigate("/admin/addservice")}>Dodać usługę</button>
                <button>Edytować usługę</button>
            </div>
        </div>

    )
}

export default Admin;