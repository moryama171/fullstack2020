import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Country = ({ data }) => {

    const [weather, setWeather] = useState([]);
    const countryWeather = () => {
        if (Object.keys(data).length > 0) {
            axios
                .get(`http://api.weatherstack.com//current?access_key=${process.env.REACT_APP_API_KEY}&query=${data.capital}`)
                .then(response => {
                    setWeather(response.data.current);
                });
        }
    };
    useEffect(countryWeather, [data]);  // Specify 'data' dependency to avoid 'React Hook useEffect missing dependency' error

    if (Object.keys(data).length > 0) {
        return (
            <div>
                <h1>{data.name}</h1>
                <p>capital: {data.capital}</p>
                <p>population: {data.population}</p>
                <h3>Languages</h3>
                <ul>
                    {data.languages.map(language =>
                        <li className="capitalize"
                            key={language.name}>
                            {language.nativeName}
                        </li>
                    )}
                </ul>
                <img alt="flag.jpg" src={data.flag}></img>
                <h2>Weather in {data.capital}</h2>
                <p><b>temperature:</b> {weather.temperature}</p>
                <img alt="weather_icon" src={weather.weather_icons}></img>
                <p><b>wind: </b>
                    {weather.wind_speed} mph,
                    direction {weather.wind_dir}
                </p>
            </div>
        );
    } else {
        return null;
    }
};

export default Country;