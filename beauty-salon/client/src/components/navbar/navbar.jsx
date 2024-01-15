import { useContext, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const NavBar = () => {

    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const handleLogin = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");   
        }
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8800/api/auth/logout');
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.error('Błąd podczas wylogowywania', error);
        }
    };

    return (
        <div className ="navbar">
            <div className="navContainer">
                <Link to="/" style={{color: indexedDB, textDecoration: "none"}} >
                    <span className="logo">Maria's Beauty</span>
                </Link>
                
                {user ? 
                    <div >
                        {user.username}
                        <button className="navButton" onClick={handleLogout}>Wyłoguj się</button>
                    </div> 
                    : 
                    <div className="navItems">
                        <button onClick = {handleRegister} className="navButton">Zarejestruj</button>
                        <button onClick = {handleLogin} className="navButton">Załoguj się</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default NavBar;
