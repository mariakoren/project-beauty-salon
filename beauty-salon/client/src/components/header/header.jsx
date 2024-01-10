import "./header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'

const Header = () => {
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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
