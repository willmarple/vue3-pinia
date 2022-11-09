<!--suppress ALL -->
<template>
  <div class="builder__wrapper" v-if="showPlaylistStats">
    <div class="builder">
      <div class="builder__playlist-controls">
        <div class="builder__playlist__input">
          <input class="form__input" type="text" placeholder="Playlist name" v-model="name" @keydown.enter="save">
        </div>
        <button class="button builder__playlist-button--save" type="button" @click="save">save</button>
        <button class="button builder__playlist-button--clear" type="button" @click="clearCurrentList">clear</button>
      </div>
      <div class="builder__item-list">
        <div class="builder__item" v-for="movie in movieStore.currentList" :key="movie.imdbID">
          <span class="builder__item-name">{{ movie.Title }}</span>
          <button class="button small danger" type="button" @click="removeMovieFromCurrentList(movie)">remove</button>
        </div>
      </div>
      <div class="builder__stats">
        <CurrentPlaylistStats/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMovieStore} from "../store/useMovieStore.js";
import CurrentPlaylistStats from "./CurrentPlaylistStats.vue";
import {computed, ref} from 'vue'
import {useListControls} from "./use/useListControls.js";

const movieStore = useMovieStore();
const currentList = computed(() => movieStore.currentList);
const firstItem = computed(() => currentList.value.length ? currentList.value[0] : null);
const name = ref(firstItem.value?.playlist?.name ?? '');

movieStore.$subscribe((mutation) => {
  if (mutation.events.key === 'currentList') {
    name.value = firstItem.value?.playlist?.name ?? '';
  }
});

const showPlaylistStats = computed(() => movieStore.currentList?.length > 0);

const {updateOrAddCurrentListToPlaylists, removeMovieFromCurrentList, clearCurrentList} = useListControls();

function save() {
  updateOrAddCurrentListToPlaylists(name.value);
}
</script>

<style scoped>
.builder {
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;
  background-color: #272939;
  border-radius: 4px;
}

.builder__playlist-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.builder__playlist__input {
  position: relative;
}

.builder__playlist__input .form__input {
  border: 0;
  border-radius: 0;
  width: 100%;
  transition: background-color 200ms ease-out;
}

.builder__playlist__input .form__input:focus {
  background-color: #161825;
}

.builder__playlist__input::before,
.builder__playlist__input::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  height: 2px;
  pointer-events: none;
}

.builder__playlist__input::before {
  width: 100%;
  background-color: rgb(173 181 189 / 20%);
}

.builder__playlist__input::after {
  width: 0;
  background-color: #adb5bd;
  transition: width 0ms linear;
}

.builder__playlist__input:focus-within::after {
  width: 100%;
  transition: width 100ms ease-out;
}

.builder__playlist-button--save,
.builder__playlist-button--save:hover {
  color: #fff;
  background-color: var(--brand-primary);
  border-color: var(--brand-primary);
}

.builder__playlist-button--clear,
.builder__playlist-button--clear:hover {
  color: #fff;
  background-color: var(--brand-secondary);
  border-color: var(--brand-secondary);
}

.builder__item-list {
  background-color: #34374a;
  padding: 16px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #535771;
  border-bottom: 0;
}

.builder__item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
}

.builder__item:first-of-type {
  padding-top: 0;
}

.builder__item:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.builder__item-name {
  flex: 1 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
}

.builder__stats {
  color: #ffffff;
  border-radius: 0 0 4px 4px;
  padding: 8px 16px;
  background-color: #535771;
  font-size: 14px;
}

.button.danger {
  transition: color 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out;
}

.button.danger:hover {
  color: #fff;
  background-color: var(--brand-teritary);
  border-color: var(--brand-teritary);
}
</style>
