import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newBlogObject) => {
  const response = await axios.post(baseUrl, newBlogObject);
  return response.data;
};

export default { create, getAll };