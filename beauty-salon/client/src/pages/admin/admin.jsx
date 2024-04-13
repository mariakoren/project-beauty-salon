import React,  { useState, useEffect } from 'react';
import './admin.css';
import { useNavigate} from "react-router-dom";

const Admin = () =>{
    const navigate = useNavigate()
    const today = new Date();
    const todayFormatted = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const [quote, setQuote] = useState('');

    useEffect(() => {
      const fetchQuote = async () => {
        try {
          const response = await fetch('https://api.quotable.io/random');
          const data = await response.json();
          setQuote(data.content);
        } catch (error) {
          console.error('Wystąpił błąd podczas pobierania cytatu:', error);
        }
      };

      fetchQuote();
    }, []);

    return (
        <div >
            <div className='hello'>
                <p>Witamy admin w naszym salonie. Dzisiaj jest {todayFormatted}</p>
                <p>Cytat na dzisiaj: {quote}</p>
            </div>
            <div className="adminContainer">
                <button onClick={()=>navigate("/admin/statistics")}>Statystyki</button>
                <button onClick={()=>navigate("/admin/addservice")}>Dodać usługę</button>
                <button onClick={()=>navigate("/admin/editservice")}>Edytować usługę</button>
            </div>
        </div>

    )
}

export default Admin;