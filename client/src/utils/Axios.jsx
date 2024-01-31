import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`
      },
});

export default instance;