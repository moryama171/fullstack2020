import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Display from './components/Display';


const App = () => {

    const [countries, setCountries] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [showAll, setShowAll] = useState(true);

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            })
    }
    useEffect(hook, [])

    const matchingCountries = countries.filter(country => country.name.toLowerCase().includes(filterString.toLowerCase()));
    const countriesToShow = showAll
        ? countries
        : matchingCountries

    const handleFilterChange = (event) => {
        setFilterString(event.target.value);

        event.target.value === ''
        ? setShowAll(true)
        : setShowAll(false)

    }

    return (
        <div>
            <Filter
                text='find countries'
                value={filterString}
                onChange={handleFilterChange}
            />
            {countriesToShow.map(country => 
                <div key={country.name}>
                    {country.name}
                </div>
            )}

        </div>
    )
}

export default App;