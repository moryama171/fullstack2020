import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newBlogObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(
    baseUrl,
    newBlogObject,
    config);
  return response.data;
};

const update = async (id, blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    blogObject
  );
  return response.data;
};

const drop = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    config);
  return response.data;
};

const comment = async (id, commentContent) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    {
      commentContent
    }
  );
  return response.data;
};


export default { comment, create, drop, getAll, setToken, update };