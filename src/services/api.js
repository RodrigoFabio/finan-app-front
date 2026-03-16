import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68c0c9000b196b9ce1c50894.mockapi.io/api/v1/', // Altere para a URL do seu backend
});

export default api;

