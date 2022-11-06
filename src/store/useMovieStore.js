import {defineStore} from "pinia";
import axios from "../lib/axios.js";

export const useMovieStore = defineStore("movieList", {
    state: () => ({
        searchTerm: "",
        movies: [],
        currentList: [],
        playlists: [],
        totalResults: 0,
        currentPage: 1,
    }),
    actions: {
        async searchMovie(page = 1) {
            try {
                const response = await axios.get('', {
                    params: {
                        s: this.searchTerm,
                        page: page,
                    }
                })

                this.movies = this.movies.concat(response.data.Search)
                this.totalResults = response.data.totalResults
                this.currentPage = page

            } catch (error) {
                console.log(error)
            }
        },
        async loadMovieDetails(id) {
            try {
                const response = await axios.get('', {
                    params: {
                        i: id,
                        plot: 'full',
                    }
                })

                const movieIndex = this.movies.findIndex(movie => movie.imdbID === id)
                this.movies[movieIndex] = response.data
            } catch (error) {
                console.log(error)
            }
        },
        setMovies(movies) {
            this.movies = movies;
        },
    },
});
