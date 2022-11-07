<!--suppress ALL -->
<template>
  <div class="stats">
    <table class="stats__item">
      <tr>
        <td><span class="stats__label">Total movies:</span></td>
        <td><span class="stats__value">{{ totalMovies }}</span></td>
      </tr>
      <tr>
        <td><span class="stats__label">Total duration: </span></td>
        <td><span class="stats__value">{{ totalDuration }}</span></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import {minutesToHours} from "date-fns";
import {useListControls} from "./use/useListControls.js";

const movieStore = useMovieStore();
const currentList = computed(() => movieStore.currentList);

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
</script>

<style scoped>
.stats__item {
  border-spacing: 1rem 0;
  border-collapse: separate;
}

.stats__label {
  margin-left: -1rem;
}

.stats__value {
  font-weight: bold;
}
</style>
