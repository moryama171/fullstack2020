import axios from 'axios';


const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getById = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return request.then(response => response.data)
}


export default { getAll, getById };
