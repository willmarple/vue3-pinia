<template>
  <div class="movie__details">
    <h3>{{ movie.Title }}</h3>
    <span class="movie__year">{{ movie.Year }}</span>
    <p class="movie__plot">{{ plot }}</p>
    <div class="movie__controls">
      <button type="button" @click="init">details</button>
    </div>
  </div>
</template>

<script setup>
import {userMovieStore} from "../store/userMovieStore.js";
import {computed} from "vue";
import {useModalStore} from "../store/useModalStore.js";

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const movieStore = userMovieStore();
const modalStore = useModalStore();

await movieStore.loadMovieDetails(props.movie.imdbID);

const details = computed(() => props.movie.details);

const plot = computed(() => details.value.Plot.split(" ").splice(0, 50).join(" ") + "...");

function init() {
  modalStore.initModal("MovieDetails", {movie: props.movie});
}
</script>

<style scoped>
.movie__details {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
}

.movie__controls {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>