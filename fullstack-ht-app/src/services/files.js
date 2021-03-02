import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getAll = () => {
    const request = axios.get(`${baseUrl}/files`);
    return request.then(response => response.data);
  };

const getImage = (filename) => {
  const request = axios.get(`${baseUrl}/image/${filename}`);
  return request.then(response => response.data);
};


  export default { getAll, getImage };