<template>
  <div class="movie-app">
    <div class="movie__form">
      <h1>Watch Blitz</h1>
      <MovieForm/>
    </div>
    <div class="movie__wrapper">
      <Playlists/>
      <MovieList/>
      <ListBuilder/>
    </div>
    <Modal v-if="modalStore.modalOpen"/>
    <Teleport to="body">
      <div class="to-top" :class="{show: showToTop}" @click="toTop">&#8963;</div>
    </Teleport>
  </div>
</template>

<script setup>
import Modal from "./modal/Modal.vue";
import {useModalStore} from "../store/useModalStore.js";
import Playlists from "./Playlists.vue";
import MovieList from "./MovieList.vue";
import ListBuilder from "./ListBuilder.vue";
import MovieForm from "./MovieForm.vue";
import {ref} from "vue";

const showToTop = ref(false)
window.addEventListener('scroll', () => {
  showToTop.value = window.scrollY > 500;
})

const modalStore = useModalStore();

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
<style scoped>
.movie-app {
  min-height: 100vh;
  width: 1200px;
  background-color: var(--bg-positive);
  display: flex;
  flex-flow: column nowrap;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
}

.movie__wrapper {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  column-gap: 24px;
  border-top: 1px solid var(--border);
  flex-grow: 1;
}

.movie__form {
  padding: 32px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--bg-positive);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 1em;
  transition: all 0.2s ease-in-out;
  opacity: 0;
}

.to-top.show {
  opacity: 1;
}
</style>
