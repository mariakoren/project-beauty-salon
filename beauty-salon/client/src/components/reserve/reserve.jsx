import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, serviceId}) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const { data, loading, error } = useFetch(`http://localhost:8800/api/services/time/${serviceId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (timeNumber) => {
    const isFound = timeNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedTimes(
      checked
        ? [...selectedTimes, value]
        : selectedTimes.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedTimes.map((timeId) => {
          const res = axios.put(`http://localhost:8800/api/times/availability/${timeId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
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
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
            </div>
            <div className="rSelectTime">
              {item.timeNumber.map((timeNum) => (
                <div className="time">
                  <label>{timeNum.number}</label>
                  <input
                    type="checkbox"
                    value={timeNum._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(timeNum)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
         <button onClick={handleClick} className="rButton">
          Zarezerwuj teraz!
        </button>
      </div>
    </div>
  );
};

export default Reserve;