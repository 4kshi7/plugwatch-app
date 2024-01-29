import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDM1MjkwMjExYjhjODBhNzM3NzU3NjRiNGRiY2YxZiIsInN1YiI6IjY0ZDdhOTA2ZjQ5NWVlMDI5MjRlZGFjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c7zDLuN0nFwWb7DhSKwM9xOfOEJRR0kl2dH3bEv9hS4'
      },
});

export default instance;