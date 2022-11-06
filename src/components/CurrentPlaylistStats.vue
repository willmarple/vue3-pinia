<!--suppress ALL -->
<template>
  <div class="stats">
    <div class="stats__item">
      <span class="stats__label">Total movies: </span>
      <span class="stats__value">{{ totalMovies }}</span>
    </div>
    <div class="stats__item">
      <span class="stats__label">Total duration: </span>
      <span class="stats__value">{{ totalDuration }}</span>
    </div>
    <div class="stats__controls">
      <input class="form__input" type="text" placeholder="name" v-model="name" @keydown.enter="save">
      <button class="button" type="button" @click="save">save</button>
      <button class="button danger" type="button" @click="clearCurrentList">clear</button>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed, ref} from "vue";
import {minutesToHours} from "date-fns";
import {useListControls} from "./use/useListControls.js";

const movieStore = useMovieStore();
const currentList = computed(() => movieStore.currentList);
const firstItem = computed(() => currentList.value.length ? currentList.value[0] : null);
const name = ref(firstItem.value?.playlist?.name ?? '');

const totalMovies = computed(() => movieStore.currentList.length);
const totalDuration = computed(() => {
  const total = movieStore.currentList.reduce((acc, movie) => {
    if (movie.Runtime && movie.Runtime !== 'N/A') {
      const [minutes] = movie.Runtime.split(' ');
      acc += parseInt(minutes);
    }
    return acc;
  }, 0);

  const hours = minutesToHours(total);
  const minutes = total % 60;

  return `${hours}h ${minutes}m`;
});

const {updateOrAddCurrentListToPlaylists, clearCurrentList} = useListControls();

function save() {
  updateOrAddCurrentListToPlaylists(name.value);
}
</script>

<style scoped>
.stats__controls {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>