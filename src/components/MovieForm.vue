<template>
  <div class="form">
    <div class="form__search-wrapper">
      <input class="form__input" :value="searchTerm" @input="search" type="text" placeholder="Search movies..."/>
      <img class="form__search-icon" :src="iconSearch" alt="Search Movies"/>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import iconSearch from "../assets/icon-search.svg"
import {useMovieStore} from "../store/useMovieStore.js";
import {debounce} from "lodash";

const movieStore = useMovieStore();
const searchTerm = computed(() => movieStore.searchTerm);

const search = debounce(function (e) {
  const _searchTerm = e.target.value.trim();
  movieStore.searchTerm = _searchTerm;

  if (_searchTerm) {
    movieStore.movies = [];
    movieStore.currentPage = 1;
    movieStore.searchMovie();
  }
}, 500);
</script>

<style scoped>
.form {
  width: 800px;
  display: flex;
  justify-content: center;
}

button {
  margin-left: 30px;
  background-color: #2f6089;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  color: white;
  width: 15%;
}

.form__search-wrapper {
  width: 50%;
  position: relative;
  margin-top: 25px;
  margin-bottom: 15px;
  color: #fff;
}

.form__input {
  width: 100%;
  height: 48px;
  padding: 0 32px 0 56px;
  line-height: 40px;
  border-radius: 48px;
  font-size: 24px;
}

.form__search-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  left: 16px;
  opacity: 0.4;
  transition: opacity 0.2s ease-out;
}

.form__search-wrapper:focus-within .form__search-icon,
.form__input:not(:placeholder-shown) + .form__search-icon {
  opacity: 1;
}
</style>
