import "./featured.css";
import reki from './reki.jpg';
import twarz from './twarz.jpg';
import fryzjerstwo from './fryzjerstwo.jpg';
import useFetch from "../../hooks/useFetch.jsx";


const Featured = () => {

    const {data, loading, error} = useFetch("http://localhost:8800/api/services/countByType?types=pielegnacjaRak,pielegnacjaTwarzy,pielegnacjaWlosow");
    return (
        <div className="featured">
            {loading ? "Loading please wait" : 
            <><div className="featuredItem">
                <img src={reki} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Pielegnacja rąk</h1>
                    <h2>{data[0]} zabiegi</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img src={twarz} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Pielegnacja twarzy</h1>
                    <h2>{data[1]} zabiegi</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img src={fryzjerstwo} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Pielegnacja włosów</h1>
                    <h2>{data[2]} zabiegi</h2>
                </div>
            </div> </>}
        </div>
    )
}

export default Featured;
