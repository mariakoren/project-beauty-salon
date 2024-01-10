import React , {useState} from 'react';
import './service.css';
import NavBar from '../../components/navbar/navbar.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from "@fortawesome/free-solid-svg-icons";

const Service = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const photos =[
        {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
        {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
        {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
        {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
        {src: "https://www.ljepotaizdravlje.hr/wp-content/uploads/2023/07/bijeli-nail-art.jpg"},
    ]
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
            <div className="serviceContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>{handleMove("l")}} />
                    <div className="sliderWrappere">
                        <img src={photos[slideNumber].src} alt="" className="sliderImg" />

                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>{handleMove("r")}}/>
                    </div>}
                <div className="serviceWrapper">
                    <button className="bookNow">Zarezerwuj teraz</button>
                    <h1 className="serviceTitle">Nazwa Usługi</h1>
                    <div className="serviceAddress">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>Gdańsk, ul. Gdańska 25/145</span>
                    </div>

                    <div className="servicePriceHighLight">
                        <span>Dobra cena, tylko u nas, w centrum Gdańska 50zł</span>
                    </div>
                    
                    <div className="serviceImages">
                        {photos.map((photo, index) => (
                            <div className="serviceImageWrapper">
                                <img onClick={()=>handleOpen(index)} src={photo.src} alt="" className="serviceImage" />
                            </div>
                        ))}
                    </div>

                    <div className="serviceDetails">
                        <div className="serviceDetailsText">
                            Jesli nie lubisz swoich paznokci swieżo po ściągnięciu hybrydy to koniecznie wybierz tą opcję. Na manicure podstawowy składa się: skrócenie paznokci, opiłowanie kształtu, opracowanie i wycięcie skórek oraz nawilżenie płytki.
                        </div>

                        <div className="serviceDetailsPrice">
                            <h2>
                                <b>50zł</b> (1.5 godziny)
                            </h2>
                            <button >Zarezerwuj teraz</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Service;
