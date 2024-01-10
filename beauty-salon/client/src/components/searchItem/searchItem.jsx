import './searchItem.css';

const SearchItem = () => {
    return(
        <div className="searchItem">
            {/* <img src="https://www.creativefabrica.com/wp-content/uploads/2023/02/20/Beauty-Salon-Logo-Vector-Illustration-Graphics-61843178-1.jpg" alt="" className="searchItemImage" /> */}
            <img src="https://st2.depositphotos.com/7725722/12036/v/450/depositphotos_120366882-stock-illustration-glamorous-logo-for-a-beauty.jpg" alt="" className="searchItemImage" />
            
            <div className="siDesc">
                <h1 className='siTitle'>Nazwa</h1>
                <span className="siAbout">Opis</span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="siDetailText">
                    <span className="siPrice">50 zł</span>
                </div>
            </div>
        </div>
    )

}

export default SearchItem;