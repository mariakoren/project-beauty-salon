import React , {useContext, useState} from 'react';
import './service.css';
import NavBar from '../../components/navbar/navbar.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch.jsx';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.jsx';

const Service = () => {
    const location =useLocation();
    const id =location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);

    const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/services/find/${id}`);
    const {dates} = useContext(SearchContext);

    // const photos =[
    //     {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    //     {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    //     {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    //     {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    //     {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    // ]
    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
        
    }
    const handleMove =(direction) => {
        let newSlideNum;

        if(direction==="l"){
            newSlideNum = slideNumber === 0 ? 4 : slideNumber-1
        } else {
            newSlideNum = slideNumber === 4 ? 0 : slideNumber+ 1
        }

        setSlideNumber(newSlideNum);
    }

    return (
        <div>
            <NavBar/>
            {loading ? "loading" : <div className="serviceContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>{handleMove("l")}} />
                    <div className="sliderWrappere">
                        <img src={data.photos[slideNumber]} alt="" className="sliderImg" />

                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>{handleMove("r")}}/>
                    </div>}
                <div className="serviceWrapper">
                    <button className="bookNow">Zarezerwuj teraz</button>
                    <h1 className="serviceTitle">{data.name}</h1>
                    <div className="serviceAddress">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>{data.address}</span>
                    </div>

                    <div className="servicePriceHighLight">
                        <span>{data.desc}</span>
                    </div>
                    
                    <div className="serviceImages">
                        {data.photos?.map((photo, index) => (
                            <div className="serviceImageWrapper">
                                <img onClick={()=>handleOpen(index)} src={photo} alt="" className="serviceImage" />
                            </div>
                        ))}
                    </div>

                    <div className="serviceDetails">
                        <div className="serviceDetailsText">
                            {data.fullDesc}
                        </div>

                        <div className="serviceDetailsPrice">
                            <h2>
                                <b>{data.price}zł</b>
                            </h2>
                            <button >Zarezerwuj teraz</button>
                        </div>
                    </div>


                </div>
            </div>}
        </div>
    )
}

export default Service;
