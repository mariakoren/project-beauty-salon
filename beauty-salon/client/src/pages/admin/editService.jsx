import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const validationSchema = Yup.object().shape({
  dates: Yup.array().of(
    Yup.object().shape({
      dayTitle: Yup.string().required('Pole wymagane'),
      times: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required('Pole wymagane'),
          isAvailable: Yup.boolean().required('Pole wymagane'),
        })
      ),
    })
  ),
});

const EditService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [values, setValues] = useState({
    name: '',
    type: '',
    desc: '',
    rating: 0,
    price: 0,
    address: '',
    fullDesc: '',
    dates: [
      {
        dayTitle: '',
        times: [{ title: '', isAvailable: false }],
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [idService, setIdService] = useState('');
  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/services`);

  useEffect(() => {
    setServices(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleTimeChange = (dateIndex, timeIndex, property, value) => {
    const newDates = [...values.dates];
    newDates[dateIndex].times[timeIndex][property] = value;
    setValues({
      ...values,
      dates: newDates,
    });
  };

  const addDateField = () => {
    setValues({
      ...values,
      dates: [...values.dates, { dayTitle: '', times: [{ title: '', isAvailable: false }] }],
    });
  };

  const addTimeField = (dateIndex) => {
    const newDates = [...values.dates];
    newDates[dateIndex].times = [...newDates[dateIndex].times, { title: '', isAvailable: false }];
    setValues({
      ...values,
      dates: newDates,
    });
  };

  const removeTimeField = (dateIndex, timeIndex) => {
    const newDates = [...values.dates];
    newDates[dateIndex].times.splice(timeIndex, 1);
    setValues({
      ...values,
      dates: newDates,
    });
  };

  const handleDateChange = (dateIndex, e) => {
    const newDates = [...values.dates];
    newDates[dateIndex].dayTitle = e.target.value;
    setValues({
      ...values,
      dates: newDates,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8800/api/services/${idService}`, values, { withCredentials: true });
      setValues({
        name: '',
        type: '',
        desc: '',
        rating: 0,
        price: 0,
        address: '',
        fullDesc: '',
        dates: [
          {
            dayTitle: '',
            times: [{ title: '', isAvailable: false }],
          },
        ],
      });
      setErrors({});
      setShowForm(false);
      reFetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (service) => {
    setShowForm(true);
    setIdService(service._id);
    setSelectedService(service);
    setValues({
      name: service.name,
      type: service.type,
      desc: service.desc || '',
      rating: service.rating || 0,
      price: service.price || 0,
      address: service.address || '',
      fullDesc: service.fullDesc || '',
      dates: service.dates || [
        {
          dayTitle: '',
          times: [{ title: '', isAvailable: false }],
        },
      ],
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/services/${id}`, { withCredentials: true });
      reFetch();
      console.log('Usunięto pomyślnie');
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const removeDateField = (dateIndex) => {
    const newDates = [...values.dates];
    newDates.splice(dateIndex, 1);
    setValues({
      ...values,
      dates: newDates,
    });
  };

  return (
    <>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <div>
              <h3>{service.name}</h3>
              <button onClick={() => handleEditClick(service)}>Edytuj</button>
              <button onClick={() => handleDeleteClick(service._id)}>Usuń</button>
            </div>
          </li>
        ))}
      </ul>

      {showForm && selectedService && (
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
            <textarea id="fullDesc" name="fullDesc" value={values.fullDesc} onChange={handleChange} />
            {errors.fullDesc && <div>{errors.fullDesc}</div>}
          </div>

          {values.dates.map((date, dateIndex) => (
            <div key={dateIndex}>
              <label htmlFor={`dates[${dateIndex}].dayTitle`}>Day Title:</label>
              <input
                id={`dates[${dateIndex}].dayTitle`}
                name={`dates[${dateIndex}].dayTitle`}
                type="text"
                value={date.dayTitle}
                onChange={(e) => handleDateChange(dateIndex, e)}
              />

              {date.times.map((time, timeIndex) => (
                <div key={timeIndex}>
                  <label htmlFor={`dates[${dateIndex}].times[${timeIndex}].title`}>Time Title:</label>
                  <input
                    id={`dates[${dateIndex}].times[${timeIndex}].title`}
                    name={`dates[${dateIndex}].times[${timeIndex}].title`}
                    type="text"
                    value={time.title}
                    onChange={(e) => handleTimeChange(dateIndex, timeIndex, 'title', e.target.value)}
                  />

                  <label htmlFor={`dates[${dateIndex}].times[${timeIndex}].isAvailable`}>Is Available:</label>
                  <input
                    id={`dates[${dateIndex}].times[${timeIndex}].isAvailable`}
                    name={`dates[${dateIndex}].times[${timeIndex}].isAvailable`}
                    type="checkbox"
                    checked={time.isAvailable}
                    onChange={(e) => handleTimeChange(dateIndex, timeIndex, 'isAvailable', e.target.checked)}
                  />

                  {date.times.length > 1 && (
                    <button type="button" onClick={() => removeTimeField(dateIndex, timeIndex)}>
                      Remove Time
                    </button>
                  )}
                </div>
              ))}

              <button type="button" onClick={() => addTimeField(dateIndex)}>
                Add Time
              </button>

              {values.dates.length > 1 && (
                <button type="button" onClick={() => removeDateField(dateIndex)}>
                  Remove Date
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addDateField}>
            Add Date
          </button>

          <div>
            <button type="button" onClick={handleSubmit}>
              Dodaj usługę
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditService;