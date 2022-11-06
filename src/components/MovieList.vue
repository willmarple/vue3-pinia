<template>
  <div class="movie__list">
    <template v-for="movie in movieList" :key="movie.imdbID">
      <img class="movie__poster" :src="movie.Poster" alt="movie poster">
      <Suspense>
        <template #default>
          <MovieListDetail :movie="movie" />
        </template>
        <template #fallback>
          <div class="movie__details">
            <h3>{{ movie.Title }}</h3>
            <span class="movie__year">{{ movie.Year }}</span>
          </div>
        </template>
      </Suspense>
    </template>
    <div v-if="movieStore.searchTerm" class="movie__load-more">
      <button class="button" type="button" @click="loadNextPage">load more</button>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import MovieListDetail from "./MovieListDetails.vue";

const movieStore = useMovieStore();

const movieList = computed(() => movieStore.movies);

function loadNextPage() {
  movieStore.searchMovie(movieStore.currentPage + 1);
}
</script>

<style scoped>
.movie__list {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 16px;
  row-gap: 24px;
  padding: 24px 0 24px 0;
}

.movie__poster {
  object-fit: cover;
  max-height: 100%;
  width: 100%;
}

.movie__load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  padding: 24px 0 0;
}
</style>
