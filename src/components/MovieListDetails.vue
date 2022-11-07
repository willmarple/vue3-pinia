<!--suppress JSValidateTypes -->
<template>
  <div class="movie__details">
    <h3>{{ movie.Title }}</h3>
    <span class="movie__year">{{ movie.Year }}</span>
    <p class="movie__plot">{{ plot }}</p>
    <div class="movie__controls">
      <button class="button movie__details-button" type="button" @click="init"><img class="movie__details-button__icon" :src="ReelIcon" alt="Film Details"/>Film Details</button>
      <button class="button" :class="['movie__controls-button', {'movie__controls-button--in-list' : isInCurrentList}]" type="button" @click="addOrRemoveMovie">
        <span class="movie__controls-button__symbol" v-html="controlSymbol"/>
        <span class="movie__controls-button__text">{{isInCurrentList ? 'Remove from List' : 'Add to List'}}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import {useModalStore} from "../store/useModalStore.js";
import {useListControls} from "./use/useListControls.js";
import ReelIcon from "../assets/icon-reel.svg"

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
  padding: 24px 24px 24px 8px;
}

.movie__details-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
}

.movie__details-button__icon {
  height: 18px;
  margin-right: 8px;
}

.movie__controls {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.movie__controls-button__text {
  display: block;
}

.movie__controls-button {
  display: inline-flex;
  flex-flow: row nowrap;
  padding-left: 11px;
  padding-right: 11px;
  color: var(--brand-primary);
  border-color: var(--brand-primary);
  transition: color 200ms ease-out, border-color 200ms ease-out, background-color 200ms ease-out;
}

.movie__controls-button:hover {
  color: #fff;
  background-color: var(--brand-primary);
  border-color: var(--brand-primary);
}

.movie__controls-button:not(.movie__controls-button--in-list) .movie__controls-button__text {
  width: 0;
  overflow: hidden;
  position: relative;
  left: 6px;
  flex: 1 1 0;
  white-space: nowrap;
  transition: width 200ms ease-out;
}

.movie__controls-button:not(.movie__controls-button--in-list):hover .movie__controls-button__text {
  width: 83px;
}

.movie__controls-button--in-list,
.movie__controls-button--in-list:hover {
  color: #fff;
  background-color: var(--brand-teritary);
  border-color: var(--brand-teritary);
}

.movie__controls-button--in-list .movie__controls-button__text {
  padding-left: 6px;
}
</style>
