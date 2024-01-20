import './searchItem.css';
import {Link} from "react-router-dom";

const SearchItem = ({item}) => {
    return(
        <div className="searchItem">
            {/* <img src="https://www.creativefabrica.com/wp-content/uploads/2023/02/20/Beauty-Salon-Logo-Vector-Illustration-Graphics-61843178-1.jpg" alt="" className="searchItemImage" /> */}
            {/* <img src="https://www.creativefabrica.com/wp-content/uploads/2023/02/20/Beauty-Salon-Logo-Vector-Illustration-Graphics-61843178-1.jpg" alt="" className="searchItemImage" alt="" className="searchItemImage" /> */}
            <img src={item.photos[0]} alt="" className="searchItemImage" />
            


            <div className="siDesc">
                <h1 className='siTitle'>{item.name}</h1>
                <span className="siAbout">{item.desc}</span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>{item.ratingDetail}</span>
                    <button>{item.rating}</button>
                    <Link to={`http://localhost:3000/services/${item._id}`}>
                        <button className='siCheckButton'>zobacz dostępność</button>
                    </Link>
                </div>
                <div className="siDetailText">
                    <span className="siPrice">{item.price} zł</span>
                </div>
            </div>
        </div>
    )

}

export default SearchItem;