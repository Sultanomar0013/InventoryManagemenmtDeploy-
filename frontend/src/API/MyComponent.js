import React, { useState, useEffect } from 'react';
import { fetchData } from './signupapi'; // Adjust the path accordingly

const MyComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchDataFromAPI() {
            try {
                const apiData = await fetchData();
                setData(apiData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataFromAPI();
    }, []);

    return (
        <div>
            {data ? (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default MyComponent;

