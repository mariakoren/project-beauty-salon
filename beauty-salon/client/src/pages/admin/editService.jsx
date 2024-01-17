import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import useFetch from "../../hooks/useFetch";

const EditService = () => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    desc: '',
    rating: 0,
    price: 0,
    address: '',
    fullDesc: '',
    times: '',
  });

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [idService, setIdService] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8800/api/services/${idService}`, values, {withCredentials: true});
      setValues({
        name: '',
        type: '',
        desc: '',
        rating: 0,
        price: 0,
        address: '',
        fullDesc: '',
        times: '',
      });
      setErrors({});
      setShowForm(false);
      reFetch();
    } catch (err) {
        console.error(err);
    }
  };

  const handleEditClick = (id) => {
    setShowForm(true); 
    setIdService(id);
  };

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/services`
  );

  return (
    <>
      <ul>
        {data &&
          data.map((service) => (
            <li key={service._id}>
              <div>
                <h3>{service.name}</h3>
                <button onClick={()=>handleEditClick(service._id)}>Edytuj</button>
              </div>
            </li>
          ))}
      </ul>

      {showForm && 
        <form>
          <div>
        <label htmlFor="name">Nazwa:</label>
        <input type="text" id="name" name="name" value={values.name} onChange={handleChange} />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="type">Typ:</label>
        <input type="text" id="type" name="type" value={values.type} onChange={handleChange} />
        {errors.type && <div>{errors.type}</div>}
      </div>

      <div>
        <label htmlFor="desc">Opis:</label>
        <textarea id="desc" name="desc" value={values.desc} onChange={handleChange} />
        {errors.desc && <div>{errors.desc}</div>}
      </div>

      <div>
        <label htmlFor="rating">Ocena:</label>
        <input type="number" id="rating" name="rating" value={values.rating} onChange={handleChange} />
        {errors.rating && <div>{errors.rating}</div>}
      </div>

      <div>
        <label htmlFor="price">Cena:</label>
        <input type="number" id="price" name="price" value={values.price} onChange={handleChange} />
        {errors.price && <div>{errors.price}</div>}
      </div>

      <div>
        <label htmlFor="address">Adres:</label>
        <input type="text" id="address" name="address" value={values.address} onChange={handleChange} />
        {errors.address && <div>{errors.address}</div>}
      </div>

      <div>
        <label htmlFor="fullDesc">Pełny opis:</label>
        <textarea id="fullDesk" name="fullDesc" value={values.fullDesc} onChange={handleChange} />
        {errors.fullDesc && <div>{errors.fullDesc}</div>}
      </div>

      <div>
        <label htmlFor="times">Godziny:</label>
        <input type="text" id="times" name="times" value={values.times} onChange={handleChange} />
        {errors.times && <div>{errors.times}</div>}
      </div>

      <div>
        <button type="button" onClick={handleSubmit}>Zmień</button>
      </div>

        </form>
      }
    </>
  );
};

export default EditService;