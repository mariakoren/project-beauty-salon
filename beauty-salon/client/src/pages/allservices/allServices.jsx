import useFetch from "../../hooks/useFetch";

const AllServices = () => {
  const {data} = useFetch('http://localhost:8800/api/services')
  return (
    <div >
      {data.map((service) => (
        <ul>
            <li key={service._id}>
                {service.name} {service.price} zł
            </li>
        </ul>
      ))}

    </div>
  );
};

export default AllServices;