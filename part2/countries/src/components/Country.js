import React from 'react';

const Country = ({ data }) => {
    data = data[0];
    console.log(data);
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
        </div>
    )
}

export default Country;