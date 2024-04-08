import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.athleti.fi/v1/',
  headers: {
    Authorization: process.env.TEMP_API_AUTH,
  },
});

export default axiosClient;
