import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Filter from './components/Filter';
import Display from './components/Display';


const App = () => {

    const [countries, setCountries] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [countriesToShow, setCountriesToShow] = useState([]);

    const countryInfo = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            });
    };
    useEffect(countryInfo, []);

    const handleFilter = (event) => {
        const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilterString(event.target.value);
        event.target.value === ''
            ? setCountriesToShow([])
            : setCountriesToShow(filteredCountries);
    };

    return (
        <div>
            <Filter
                text='find countries'
                value={filterString}
                onChange={handleFilter}
            />
            <Display countries={countriesToShow}/>
        </div>
    );
};

export default App;