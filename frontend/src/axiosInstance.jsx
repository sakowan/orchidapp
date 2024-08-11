import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true, // Ensure credentials are included
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true

export default client;
