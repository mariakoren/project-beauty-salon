import "./header.css";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns";

const Header = () => {

    const [openDate, setOpenDate] = useState(false);
    const [service, setService] = useState("");
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const navigate = useNavigate();
    const handleSearch = () => {
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
                        <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, 'MM/dd/yyyy')} do ${format(date[0].endDate, 'MM/dd/yyyy')}  `}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            minDate={new Date()}
                            className="date"/>}
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
