import axios from "axios";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
// import "./output.css";
import "./opinions.css";

const Opinions = () => {
  const { data, reFetch } = useFetch("http://localhost:8800/api/opinions/sorted");
  const [values, setValues] = useState({
    content: "",
    rating: "",
    date: new Date().toISOString().split("T")[0],
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
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form className="mb-4 oInput">
        <div className="container">
        <div className="mb-4">
          <label htmlFor="content">Treść opinii:</label>
          <textarea
            id="content"
            name="content"
            value={values.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 lInput"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating">Ocena:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 lInput"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 lButton"
          >
            Dodaj opinię
          </button>
        </div>
        </div>
      </form>
      <>
        {data.map((dane) => (
          <ul
            key={dane._id}
            className="mb-4 bg-gray-100 p-4 rounded-md border border-solid border-1 border-rgb(213, 235, 228)"
          >
            <li className="element">
              <div>
                <h3 className="text-lg font-medium">{dane.date}</h3>
                <p className="text-sm">ocena: {dane.rating}</p>
                <p className="mt-2">{dane.content}</p>
              </div>
            </li>
          </ul>
        ))}
      </>
    </div>
  );
};

export default Opinions;