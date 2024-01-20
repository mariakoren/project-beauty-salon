import "./header.css";
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {DateRange} from 'react-date-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns";
import { SearchContext } from "../../context/SearchContext";

const Header = () => {

    const [openDate, setOpenDate] = useState(false);
    const [service, setService] = useState("");
    const [date, setDate] = useState(new Date())

    const navigate = useNavigate();

    const {dispatch} = useContext(SearchContext);


    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{service, date}})
        navigate("/services", {state: {service, date}})
    };





    return (
        <div className ="header">
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
                        type = " text"
                        placeholder="Jaki zabieg szukamy?"
                        className="headerSearchInput"
                        onChange={e=>setService(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem" >
                        <FontAwesomeIcon icon={faCalendar} className="headerIcon"/>
                        <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date, 'MM/dd/yyyy')}`}</span>
                        {openDate && 
                           <div className="calendar-container">
                           <DatePicker
                             selected={date}
                             onChange={(date) => setDate(date)}
                             minDate={new Date()}
                             dateFormat="MM/dd/yyyy"
                             className="headerSearchText"
                           />
                         </div>

                            }
                    </div>

                    <div className="headerSearchItem" >
                        <button className="headerBth" onClick={handleSearch}>Szukaj</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Header;