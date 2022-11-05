import Axios from 'axios'

const axios = Axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axios