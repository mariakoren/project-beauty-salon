import React, { useState} from 'react';
import {useLocation} from  'react-router-dom';
import './list.css';
import NavBar from '../../components/navbar/navbar.jsx';
import {format} from "date-fns";
import {DateRange} from 'react-date-range';


const List = () => {
    const location = useLocation();
    const [service, setService] = useState(location.state.service);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);



    return (
        <div>
            <NavBar/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Nazwa zabiegu</label>
                            <input type="text" placeholder={service} />
                        </div>
                        <div className="lsItem">
                            <label>Interesujące dni</label>
                            <span onClick={()=> setOpenDate(!openDate)}>{`${format(date[0].startDate, 'MM/dd/yyyy')} do ${format(date[0].endDate, 'MM/dd/yyyy')}  `}</span>
                            {openDate && <DateRange 
                            onChange={item=>setDate(item.selection)}
                            minDate={new Date()}
                            ranges={date}
                            />}
                        </div>
                       
                        <button>Szukaj</button>
            
                    </div>
                    <div className="listResult"></div>
                </div>
            </div>

        </div>

    )
        
}

export default List;
