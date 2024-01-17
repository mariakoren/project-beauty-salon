import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pole wymagane'),
  type: Yup.string().required('Pole wymagane'),
  desc: Yup.string(),
  rating: Yup.number().min(1, 'Ocena musi być większa lub równa 1').max(5, 'Ocena musi być mniejsza lub równa 5'),
  price: Yup.number().min(0, 'Cena nie może być ujemna').required('Pole wymagane'),
  address: Yup.string().required('Pole wymagane'),
  fullDesc: Yup.string(),
  times: Yup.string().required('Pole wymagane'),
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
    times: '',
  });

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
      await axios.post("http://localhost:8800/api/services", values, {withCredentials: true});
      // Zresetuj wartości po udanym dodaniu usługi
    //   setValues({
    //     name: '',
    //     type: '',
    //     desc: '',
    //     rating: 0,
    //     price: 0,
    //     address: '',
    //     fullDesc: '',
    //     times: '',
    //   });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        // Obsługa innych błędów
        console.error(err);
      }
    }
  };

  return (
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
        <button type="button" onClick={handleSubmit}>Dodaj usługę</button>
      </div>
    </form>
  );
};

export default AddServiceForm;