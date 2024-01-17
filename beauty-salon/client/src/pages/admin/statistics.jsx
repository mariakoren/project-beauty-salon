import axios from "axios";
import useFetch from "../../hooks/useFetch";


const Statistics = () => {
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/users`);

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    if (error) {
        return <p>Błąd podczas pobierania danych: {error.message}</p>;
    }

    return (
        <div>
            <ul>
                {data && data.map((dane) => (
                    <li key={dane.id}>
                        {/* {dane.username} */}
                        <button>Statystyki dla {dane.username}</button>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Statistics;