import React, { useState} from 'react';
import {useLocation} from  'react-router-dom';
import './list.css';
import NavBar from '../../components/navbar/navbar.jsx';
import SearchItem from '../../components/searchItem/searchItem.jsx';
import {format} from "date-fns";
import {DateRange} from 'react-date-range';
import useFetch from '../../hooks/useFetch.jsx';
import DatePicker from "react-datepicker";

const List = () => {
    const location = useLocation();
    const [service, setService] = useState(location.state.service);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const formattedDateResult = `${year}-${month}-${day}`;

    // const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/services?type=${service}`);
    const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/services/search?pattern=${service}&dateTitle=${formattedDateResult}`);


    const handleClick = ()=> {
        reFetch()
    }



    return (
        <div>
            <NavBar/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Nazwa zabiegu</label>
                            <input
                              type="text"
                              placeholder={service}
                              onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                        <div className="lsItem">
                            <label>Interesujące dni</label>
                            <span onClick={()=> setOpenDate(!openDate)}>{`${format(date, 'MM/dd/yyyy')}`}</span>
                            {openDate && (
                                // <DateRange
                                //   onChange={(item) => setDates([item.selection])}
                                //   minDate={new Date()}
                                //   ranges={dates}
                                // />
                                <DatePicker
                            //   selected={dates[0]} 
                                      onChange={date => setDate(date)} 
                                      minDate={new Date()} 
                                      className="date"
                                    />
                              )}
                        </div>
                       
                        <button onClick={handleClick}>Szukaj</button>
            
                    </div>
                    <div className="listResult">
                        {loading ? "loading" : <>
                            {data.map(item => (
                                <SearchItem item={item} key={item._id}/>
                            ))}
                        </>}
                    </div>
                </div>
            </div>

        </div>

    )
        
}

export default List;