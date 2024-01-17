import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { SearchContext } from '../../context/SearchContext';
import './header.css';

const Header = () => {
  const [openDate, setOpenDate] = useState(false);
  const [service, setService] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { service, dates: [{ startDate }] } });
    navigate('/services', { state: { service, dates: [{ startDate }] } });
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPhone} />
            <span>123456789</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faInstagram} />
            <span>mariasbeauty</span>
          </div>
        </div>
        <h1 className="headerTitle">Zapraszamy do naszego salonu</h1>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <input
              type="text"
              placeholder="Jaki zabieg szukamy?"
              className="headerSearchInput"
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
              className='react-datepicker-wrapper'
            />
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Szukaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;