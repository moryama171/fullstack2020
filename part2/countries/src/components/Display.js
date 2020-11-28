import React from 'react';

const Display = ({ content }) => {

    if (content.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        );
    }
    else {
        return (
            <div>
                {content.map(country => 
                    <div key={country.name}>
                        {country.name}
                    </div>
                )}
            </div>
        );
    }
}

export default Display;