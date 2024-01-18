import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const MyHistory = () => {
  const {user} = useContext(AuthContext);
  const {data: userdata} = useFetch(`http://localhost:8800/api/reservation/find?id=${user._id}`)


  
  return (
    <div >
      <g1>Twoje rezerwacji {user.username}</g1>

      {userdata.map((dane) => (
            <li key={dane._id}>
                <ServiceData serviceId={dane.serviceId} day={dane.date}/>
            </li>
      ))}

    </div>
  );
};


const ServiceData = ({serviceId, day}) => {
    const {data} = useFetch(`http://localhost:8800/api/services/find/${serviceId}`);
    return (
      <>
        masz <b>{data.name}</b> dnia {day}
      </>
    )

}
export default MyHistory;