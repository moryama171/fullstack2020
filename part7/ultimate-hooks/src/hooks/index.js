import { useState, useEffect } from 'react';
import axios from 'axios';


export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange
    };
};

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    // Fetch all resources 
    useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data);
            })
            .catch((e) => console.log('This error occurred while fetching data', e));
    }, [baseUrl]);

    // Call api to add new resource
    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource);
        setResources(resources.concat(response.data));
    };

    const service = {
        create
    };

    return [
        resources, service
    ];
};
