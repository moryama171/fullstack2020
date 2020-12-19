import React, { useState } from 'react';
import Country from './Country';


const Display = ({ countries }) => {
    const [hideCountry, setHideCountry] = useState(true);
    const [countryToShow, setCountryToShow] = useState({});
    const handleShowCountry = (country) => {
        setHideCountry(!hideCountry);
        hideCountry
            ? setCountryToShow(country)
            : setCountryToShow({});
    };

    if (countries.length === 1) {
        return (
            <Country data={countries[0]} />
        );
    } else if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        );
    } else {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name}>
                        {country.name}
                        <button onClick={() => handleShowCountry(country)}>
                            {countryToShow.name === country.name ? 'hide' : 'show'}
                        </button>
                    </div>
                )}
                <Country data={countryToShow} />
            </div>
        );
    }
};

export default Display;