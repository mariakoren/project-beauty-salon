import React from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();
  const { data: userData, loading: userLoading, error: userError, reFetch: userReFetch } = useFetch(
    "http://localhost:8800/api/users"
  );

  return (
    <div>
      <ul>
        {userData && userData.reduce((accumulator, user) => {
          accumulator.push(
            <li key={user.id}>
              <div>
                <h3>Statystyki dla {user.username}</h3>
                <h4>Wszystkie rezerwacje</h4>
                <UserReservations userId={user._id} />
              </div>
            </li>
          );
          return accumulator;
        }, [])}
      </ul>
    </div>
  );
};

const UserReservations = ({ userId }) => {
  const { data: reservationData, loading: reservationLoading, error: reservationError, reFetch: reservationReFetch } =
    useFetch(`http://localhost:8800/api/reservation/find/?id=${userId}`);

    const handleConfirm = async (id) => {
      try {
        const response = await axios.put(`http://localhost:8800/api/reservation/${id}/confirm`);
        reservationReFetch();
        console.log('Reservation confirmed:', response.data);
      } catch (error) {
        console.error('Error confirming reservation:', error.response.data);
      }
    };
  return (
    <div>
      {reservationData.map((reservation) => (
        <li key={reservation.id}>
            <div>
                <ul>
                    <li><ServiceDetails serviceId={reservation.serviceId}/> </li>
                    <li>{reservation.dateTime.dateTitle} {reservation.dateTime.timeTitle}</li>
                    <li>{reservation._id}</li>
                    <li>{reservation.status}</li>
                    {
                      reservation.status==="made" ? 
                          <button onClick={() => handleConfirm(reservation._id)}>potwierdź rezerwacje</button> :
                          <></>
                    }

                    <br/>
                </ul>
                <br/>
            </div>
        </li>
        
      ))}
      {reservationData.length!==0 ? 
        <div>
            <h4>średnia cena ze wszysrkich usług:</h4> <Average userId={userId}/>
        </div> 
        : 
        <></>}
    </div>
  );
};

const ServiceDetails = ({serviceId}) => {
    const { data: serviceData, loading: serviceLoading, error: serviceError, reFetch: serviceReFetch } =
    useFetch(`http://localhost:8800/api/services/find/${serviceId}`);

    return (
        <div>
            {serviceData.name}
        </div>
    )
}


const Average = ({userId}) => {
    const {data: averagedata} = useFetch(`http://localhost:8800/api/reservation/average?id=${userId}`)
    return (
        <div>{averagedata.averagePrice}</div>
    )
}

export default Statistics;