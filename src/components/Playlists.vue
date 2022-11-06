<!--suppress ALL -->
<template>
  <div class="playlists__wrapper">
    <div class="playlists">
      <div class="playlists__list-item" v-for="playlist in playlists" :key="playlist.id">
        <div class="playlists__list-item-name">{{ playlist.name }}</div>
        <div class="playlists__list-item-controls">
          <button class="button" type="button" @click="view(playlist)">view</button>
          <button class="button danger" type="button" @click="remove(playlist)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import {useListControls} from "./use/useListControls.js";

const movieStore = useMovieStore();

const playlists = computed(() => movieStore.playlists);

const {setCurrentList, removeListFromPlaylist} = useListControls();

function view(playlist) {
  movieStore.setMovies(playlist.list)
  setCurrentList(playlist.list);
}

function remove(playlist) {
  removeListFromPlaylist(playlist.id);
}

</script>

<style scoped>
.playlists__wrapper {
  border-right: 1px solid var(--border);
}
.playlists {
  position: sticky;
  top: 0;
}

.playlists__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid var(--border);
}

.playlists__list-item-controls {
  display: flex;
  gap: 8px;
}
</style>