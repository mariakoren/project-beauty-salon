import React from 'react';
import './home.css';
import NavBar from '../../components/navbar/navbar.jsx';
import Header from '../../components/header/header.jsx';
import Featured from '../../components/featured/featured.jsx';

const Home = () =>{
    return (
        <div>
            <NavBar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
            </div>
        </div>

    )
}

export default Home;