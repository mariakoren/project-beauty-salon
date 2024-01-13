import "./featured.css";
import reki from './reki.jpg';
import twarz from './twarz.jpg';
import fryzjerstwo from './fryzjerstwo.jpg';
import useFetch from "../hooks/useFetch.jsx";


const Featured = () => {
    const {data, loading, error} = useFetch("/services/countByType?types=pielegnacjaRak,fryzjerstwo,pielegnacjaTwarzy");
    console.log(data);
    return (
        <div className="featured">
            <div className="featuredItem">
                <img src={reki} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Pielegnacja rąk</h1>
                    <h2>{data[0]} zabiegów</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img src={twarz} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Pielegnacja twarzy</h1>
                    <h2>{data[1]} zabiegów</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img src={fryzjerstwo} alt="" className="featuredImage" />
                <div className="featuredTitle">
                    <h1>Fryzjerstwo</h1>
                    <h2>{data[2]} zabiegów</h2>
                </div>
            </div>
        </div>
    )
}

export default Featured;
