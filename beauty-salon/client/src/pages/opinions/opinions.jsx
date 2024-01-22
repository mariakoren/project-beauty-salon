import axios from "axios";
import {  useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.jsx";



const Opinions = () => {
    // const {data, reFetch} = useFetch(`http://localhost:8800/api/opinions?sortBy=${sortBy}&sortOrder=${sortOrder}`)
    const {data, reFetch} = useFetch('http://localhost:8800/api/opinions/sorted')
    const [values, setValues] = useState({
        content: '',
        rating: '',
        date: new Date().toISOString().split('T')[0],
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

    const handleSubmit = async () => {
        try {
          await axios.post("http://localhost:8800/api/opinions", values);
          reFetch();
        } catch (err) {
            console.error(err);
          }
        }
        return (
          <div >
            <form>
                <div>
                  <label htmlFor="content">Treść opinii:</label>
                  <textarea id="content" name="content" value={values.content} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="rating">Ocena:</label>
                  <input type="number" id="rating" name="rating" value={values.rating} onChange={handleChange} />  
                </div>
                <div>
                  <button type="button" onClick={handleSubmit}>Dodaj opinię</button>
                </div>
                </form>
                <>
                    {data.map((dane) => (
                        <ul key = {dane._id}>
                            <li>
                                <div>
                                    <h3>{dane.date}</h3>
                                    <p>ocena: {dane.rating}</p>
                                    <p>{dane.content}</p>
                                </div>
                            </li>
                        </ul>
                    ))}
                </>
          </div>
        );
};

export default Opinions;