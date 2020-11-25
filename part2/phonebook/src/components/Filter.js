import React from 'react';

const Filter = ({ filterString, handleFilter }) => {
    return (
        <div>
            filter by name 
                <input
                    value={filterString}
                    onChange={handleFilter}
                />
        </div>
    );
}

export default Filter;