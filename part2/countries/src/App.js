import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {

    const [countries, setCountries] = useState([]);

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <ul>
                {countries.map(country => 
                        <li>
                            {country.name}
                        </li>
                )}
            </ul>
        </div>
    )
}

export default App;