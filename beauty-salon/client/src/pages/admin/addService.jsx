import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pole wymagane'),
  type: Yup.string().required('Pole wymagane'),
  desc: Yup.string(),
  rating: Yup.number().min(1, 'Ocena musi być większa lub równa 1').max(5, 'Ocena musi być mniejsza lub równa 5'),
  price: Yup.number().min(0, 'Cena nie może być ujemna').required('Pole wymagane'),
  address: Yup.string().required('Pole wymagane'),
  fullDesc: Yup.string(),
});

const AddServiceForm = () => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    desc: '',
    rating: 0,
    price: 0,
    address: '',
    fullDesc: '',
  });
  const [serviceId, setServiceId] = useState('');

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const res = await axios.post("http://localhost:8800/api/services", values, {withCredentials: true});
      setValues({
        name: '',
        type: '',
        desc: '',
        rating: 0,
        price: 0,
        address: '',
      });
      setErrors({});
      setServiceId(res.data._id);
    } catch (err) {
        console.error(err);
      }
    
  };

  const [formData, setFormData] = useState({
    title: '',
    timeNumber: [{ number: '' }],
  });

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleNumberChange = (index, e) => {
    const newTimeNumbers = [...formData.timeNumber];
    newTimeNumbers[index] = { number: e.target.value };
    setFormData({ ...formData, timeNumber: newTimeNumbers });
  };

  const addTimeNumberField = () => {
    setFormData({
      ...formData,
      timeNumber: [...formData.timeNumber, { number: '' }],
    });
  };

  const removeTimeNumberField = (index) => {
    const newTimeNumbers = [...formData.timeNumber];
    newTimeNumbers.splice(index, 1);
    setFormData({ ...formData, timeNumber: newTimeNumbers });
  };

  const handleSubmitTime = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8800/api/times/${serviceId}`, formData, {withCredentials: true});
   
    
  };
  return (
    <>
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
        <button type="button" onClick={handleSubmit}>Dodaj usługę</button>
      </div>
    </form>

    <form onSubmit={handleSubmitTime}>
      <div>
        <label>Nazwa:</label>
        <input type="text" value={formData.title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Godzina</label>
        {formData.timeNumber.map((time, index) => (
          <div key={index}>
            <input
              type="text"
              value={time.number}
              onChange={(e) => handleNumberChange(index, e)}
            />
            {formData.timeNumber.length > 1 && (
              <button type="button" onClick={() => removeTimeNumberField(index)}>
                Usuń
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addTimeNumberField}>
          Dodaj nową godzine
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default AddServiceForm;