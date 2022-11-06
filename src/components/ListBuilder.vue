<template>
  <div class="builder__wrapper">
    <div class="builder">
      <div v-if="showPlaylistStats" class="builder__item builder__stats">
        <CurrentPlaylistStats/>
      </div>
      <div class="builder__item" v-for="movie in movieStore.currentList" :key="movie.imdbID">
        <span class="builder__item-name">{{ movie.Title }}</span>
        <button class="button small danger" type="button" @click="removeMovieFromCurrentList(movie)">remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import CurrentPlaylistStats from "./CurrentPlaylistStats.vue";
import {computed} from "vue";
import {useListControls} from "./use/useListControls.js";

const movieStore = useMovieStore();

const showPlaylistStats = computed(() => movieStore.currentList?.length > 0);

const {removeMovieFromCurrentList} = useListControls();
</script>

<style scoped>
.builder__wrapper {
  border-left: 1px solid var(--border);
}

.builder {
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--bg-positive);
  position: sticky;
  top: 0;
}

.builder__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
}

.builder__item-name {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.builder__stats {
  background-color: var(--bg-positive);
}
</style>