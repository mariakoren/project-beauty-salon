import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";


const MyHistory = () => {
  const {user} = useContext(AuthContext);
  const {data: userdata} = useFetch(`http://localhost:8800/api/reservation/find?id=${user._id}`)

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:8800/api/reservation/${id}`);
      console.log(`Rezerwacja ${response.data} została usunięta, a usługa zaktualizowana pomyślnie`);
    } catch (error) {
      console.error('Błąd podczas usuwania rezerwacji:', error.response.data);
    }
  };
  



  
  return (
    <div >
      <h1>Twoje rezerwacji {user.username}</h1>

      {userdata.map((dane) => (
            <li key={dane._id}>
                <ServiceData serviceId={dane.serviceId} day={dane.dateTime.dateTitle} time={dane.dateTime.timeTitle}/>
                {
                  dane.status === "made"?
                  <button onClick={() => handleDelete(dane._id)}>usuń</button>
                  : <></>
                }
            </li>
      ))}

    </div>
  );
};


const ServiceData = ({serviceId, day, time}) => {
    const {data} = useFetch(`http://localhost:8800/api/services/find/${serviceId}`);
    return (
      <>
        masz <b>{data.name}</b> dnia {day} o godzinie {time}
        {
          
        }
      </>
    )

}
export default MyHistory;