import {defineStore} from "pinia";
import axios from "../lib/axios.js";

export const userMovieStore = defineStore("movieList", {
    state: () => ({
        movies: [],
    }),
    actions: {
        async searchMovie(movie) {
            try {
                const response = await axios.get('', {
                    params: {
                        s: movie,
                        plot: 'full',
                    }
                })

                this.setMovies(response.data.Search)

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
                this.movies[movieIndex] = {
                    ...this.movies[movieIndex],
                    details: response.data,
                }
                console.log('MOVIE DETAIL', this.movies[movieIndex])


            } catch (error) {
                console.log(error)
            }
        },
        setMovies(movies) {
            this.movies = movies;
        }
        // addTodo(item) {
        //     this.todoList.push({item, id: this.id++, completed: false});
        // },
        // deleteTodo(itemID) {
        //     this.todoList = this.todoList.filter((object) => {
        //         return object.id !== itemID;
        //     });
        // },
        // toggleCompleted(idToFind) {
        //     const todo = this.todoList.find((obj) => obj.id === idToFind);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },
        // inputAlert() {
        //     this.showAlert = true;
        //     setTimeout(() => {
        //         this.showAlert = false;
        //     }, 1000);
        // },
    },
});
