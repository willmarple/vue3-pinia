<template>
  <div class="movie-app">
    <div class="movie__form">
      <h1 class="movie__form-title">Watch <img :src="viteLogo" alt="Vite" class="movie__form-title-logo"/> Blitz</h1>
      <MovieForm/>
    </div>
    <div class="movie__wrapper">
      <Playlists/>
      <MovieList/>
    </div>
    <Modal v-if="modalStore.modalOpen"/>
    <Teleport to="body">
      <div :class="{show: showToTop}" class="to-top" @click="toTop"><span class="to-top__caret"/></div>
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
import viteLogo from "../assets/vite-logo.svg"

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
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 1200px;
  min-height: 100vh;
  background-color: rgb(0 0 0 / 75%);
  z-index: 1;
}

.movie__wrapper {
  display: grid;
  grid-template-columns: 320px 1fr 1px;
  column-gap: 24px;
  flex-grow: 1;
}

.movie__form-title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.movie__form-title-logo {
  display: inline-block;
  position: relative;
  top: -10px;
  left: -6px;
  width: 70px;
  margin-left: -24px;
  margin-right: -24px;
  z-index: -1;
}

.movie__form {
  padding: 32px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.to-top {
  position: fixed;
  bottom: 18px;
  right: 24px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 0 10px;
  background: var(--brand-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 200ms ease-out, box-shadow 200ms ease-out, bottom 200ms ease-out;
  opacity: 0;
  pointer-events: none;
}

.to-top.show {
  opacity: 0.7;
  bottom: 24px;
  pointer-events: all;
}

.to-top.show:hover {
  background: linear-gradient(45deg, var(--brand-primary) 40%, var(--brand-teritary), var(--brand-secondary) 70%);
  background-size: 800% 800%;
  animation: toTopGradient 10s ease infinite;
  box-shadow: 5px 2px 20px rgb(31 5 48 / 80%);
  opacity: 1;
}

.to-top__caret {
  display: block;
  border-right: 8px solid transparent;
  border-bottom: 10px solid white;
  border-left: 8px solid transparent;
}

@keyframes toTopGradient {
  0% { background-position: 0 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0 50% }
}
</style>
