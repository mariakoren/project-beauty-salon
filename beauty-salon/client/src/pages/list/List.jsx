import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './list.css';
import NavBar from '../../components/navbar/navbar.jsx';
import SearchItem from '../../components/searchItem/searchItem.jsx';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import useFetch from '../../hooks/useFetch.jsx';
import 'react-datepicker/dist/react-datepicker.css';

const List = () => {
  const location = useLocation();
  const [service, setService] = useState(location.state?.service || '');
  const [selectedDate, setSelectedDate] = useState(location.state?.dates?.[0]?.startDate || new Date());

  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/services/search?pattern=${service}`);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <NavBar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Nazwa zabiegu</label>
              <input type="text" placeholder={service} onChange={(e) => setService(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Interesujący dzień</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
              />
            </div>

            <button onClick={handleClick}>Szukaj</button>
          </div>
          <div className="listResult">
            {loading ? 'loading' : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;