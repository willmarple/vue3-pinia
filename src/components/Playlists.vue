<!--suppress ALL -->
<template>
  <div class="playlists__container">
    <div class="playlists__wrapper">
      <div class="playlists">
        <h3 class="playlists__header">My Playlists</h3>
        <p class="playlists__dialogue" v-if="playlists.length === 0 && !showPlaylistStats">You don't have any playlists!<br>Search for movies to create one.</p>
        <div class="playlists__list-item" v-for="playlist in playlists" :key="playlist.id">
          <div class="playlists__list-item-name">{{ playlist.name }}</div>
          <div class="playlists__list-item-controls">
            <button class="button" type="button" @click="view(playlist)">view</button>
            <button class="button danger" type="button" @click="remove(playlist)">delete</button>
          </div>
        </div>
        <ListBuilder/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import {computed} from "vue";
import {useListControls} from "./use/useListControls.js";
import ListBuilder from './ListBuilder.vue'

const movieStore = useMovieStore();

const playlists = computed(() => movieStore.playlists);
const showPlaylistStats = computed(() => movieStore.currentList?.length > 0);

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
  position: sticky;
  top: 36px;
}

.playlists {
  margin-bottom: 32px;
  border: 7px double rgb(255 255 255 / 10%);
  padding: 16px;
  border-radius: 8px;
  background-color: #000;
}

.playlists__header {
  position: relative;
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.playlists__header::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(45deg, var(--brand-primary), var(--brand-secondary) 70%);
}

.playlists__dialogue {
  font-style: italic;
  text-align: center;
}

.playlists__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgb(146 146 146 / 20%);
}

.playlists__list-item:last-of-type {
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: 0;
}

.playlists__list-item-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.playlists__list-item-controls {
  display: flex;
  gap: 8px;
}

.button.danger:hover {
  color: var(--brand-teritary);
  border-color: var(--brand-teritary);
}
</style>
