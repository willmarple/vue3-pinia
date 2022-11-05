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
  </div>
</template>

<script setup>
import {userMovieStore} from "../store/userMovieStore.js";
import {computed} from "vue";
import MovieListDetail from "./MovieListDetails.vue";

const store = userMovieStore();

const movieList = computed(() => store.movies);

</script>

<style scoped>
.movie__list {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 16px;
  row-gap: 24px;
}

.movie {
}

.movie__poster {
  object-fit: cover;
  max-height: 100%;
  width: 100%;
}
</style>
