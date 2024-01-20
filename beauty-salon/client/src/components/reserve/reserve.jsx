import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Reserve = ({ setOpen, serviceId}) => {
  // const { data } = useFetch(`http://localhost:8800/api/services/${serviceId}/availability`);
  const { date } = useContext(SearchContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTimes, setSelectedTimes] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const formattedDateResult = `${year}-${month}-${day}`;

      setData(formattedDateResult);
      try {
        const response = await axios.get(`http://localhost:8800/api/services/${serviceId}/availability`, {
          params: {
            dayTitle: formattedDateResult
          }
        });

        console.log(`Dostępne godziny dla usługi w dniu ${formattedDateResult}:`, response.data);
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(`Brak danych dla wybranego dnia. ${formattedDateResult}`);
        } else {
          console.error('Błąd podczas pobierania danych:', error);
        }
      }
    };

    fetchData();
  }, [date]);

  

  const handleSelect= (event) => {
    setSelectedTimes(event.target.value);
  };



  const handleClick = async () => {
    const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const formattedDateResult = `${year}-${month}-${day}`;
      const reservationData = {
        userId: user._id,
        serviceId: serviceId,
        dateTime: {
          dateTitle: formattedDateResult,
          timeTitle: selectedTimes
        }
      };
      
      axios.post('http://localhost:8800/api/reservation', reservationData)
        .then(response => {
          console.log('Reservation created successfully:', response.data);
        })
        .catch(error => {
          console.error('Error creating reservation:', error.response ? error.response.data : error.message);
        });

      navigate("/");     
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Wybierz godzinę:</span>

        {
          Array.isArray(data) && data.map((item) => (
            <div key={item._id}>
              <input
                type="radio"
                id={`radio_${item._id}`}
                name="selectedTime"
                value={item.title}
                onChange={handleSelect}
              />
              <label htmlFor={`radio_${item._id}`}>{item.title}</label>
            </div>
          ))
        }
         <button onClick={handleClick} className="rButton">
          Zarezerwuj teraz!
        </button>
      </div>
    </div>
  );
};

export default Reserve;