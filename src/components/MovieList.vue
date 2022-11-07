<template>
  <div class="movie__list">
    <template v-for="movie in movieList" :key="movie.imdbID">
      <div class="movie__card">
        <div class="movie__poster">
          <img class="movie__poster--image" :src="movie.Poster" alt="movie poster" v-if="movie.Poster !== 'N/A'">
          <span class="movie__poster--none" v-else>Image Not Available</span>
        </div>
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
      </div>
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
.movie__list {}

.movie__card {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 16px;
  row-gap: 24px;
  position: relative;
  top: 0;
  height: 320px;
  background: linear-gradient(150deg, #010101 20%, #121212 70%, #010101 100%);
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid #3d3d3d;
  overflow: hidden;
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.movie__card:hover {
  transform: scale(1.0125) translateZ(0);
  box-shadow: 20px 32px 26px -20px rgb(0 0 0 / 60%);
}

.movie__poster--image {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
}

.movie__poster--none {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  background-color: #171717;
}

.movie__load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  padding: 24px 0 0;
}
</style>
