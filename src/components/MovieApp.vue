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
  </div>
</template>

<script setup>
import Modal from "./modal/Modal.vue";
import {useModalStore} from "../store/useModalStore.js";
import Playlists from "./Playlists.vue";
import MovieList from "./MovieList.vue";
import ListBuilder from "./ListBuilder.vue";
import MovieForm from "./MovieForm.vue";

const modalStore = useModalStore();
</script>
<style scoped>
.movie-app {
  min-height: 100vh;
  width: 1200px;
  background-color: #f7f9fc;
}

.movie__wrapper {
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  padding-bottom: 32px;
}

.movie__form {
  padding: 32px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
