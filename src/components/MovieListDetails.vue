<!--suppress JSValidateTypes -->
<template>
  <div class="movie__details">
    <h3>{{ movie.Title }}</h3>
    <span class="movie__year">{{ movie.Year }}</span>
    <p class="movie__plot">{{ plot }}</p>
    <div class="movie__controls">
      <button class="button" type="button" @click="addOrRemoveMovie" v-html="controlSymbol"></button>
      <button class="button" type="button" @click="init">details</button>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import {useModalStore} from "../store/useModalStore.js";
import {useListControls} from "./use/useListControls.js";

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const movieStore = useMovieStore();
const modalStore = useModalStore();

if (!props.movie.hasOwnProperty('imdbRating')) {
  await movieStore.loadMovieDetails(props.movie.imdbID);
}

const plot = computed(() => props.movie.Plot?.split(" ").splice(0, 50).join(" ") + "...");

const {
  isInCurrentList,
  addMovieToCurrentList,
  removeMovieFromCurrentList
} = useListControls(props.movie);

const controlSymbol = computed(() => isInCurrentList.value ? '&minus;' : '&plus;');

function addOrRemoveMovie() {
  if (isInCurrentList.value) {
    removeMovieFromCurrentList(props.movie);
  } else {
    addMovieToCurrentList(props.movie);
  }
}

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
  gap: 16px;
}
</style>