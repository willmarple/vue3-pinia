<template>
  <div class="form">
    <input class="form__input" :value="searchTerm" @input="search" type="text"/>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useMovieStore} from "../store/useMovieStore.js";
import {debounce} from "lodash";

const movieStore = useMovieStore();
const searchTerm = computed(() => movieStore.searchTerm);

const search = debounce(function (e) {
  movieStore.searchTerm = e.target.value;
  movieStore.searchMovie();
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

.form__input {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
