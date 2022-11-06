<template>
  <teleport to="body">
    <div class="modal__background" @click="modalStore.close">
      <div class="modal__container" @click.stop>
        <svg class="modal__close" @click="modalStore.close" width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L4 20" stroke="white"/>
          <path d="M4 4L20 20" stroke="white"/>
        </svg>


        <component :is="modalStore.component" :="modalStore.props"></component>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {useModalStore} from "../../store/useModalStore.js";

const modalStore = useModalStore();
</script>

<style scoped>
.modal__background {
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .65);
  z-index: 100;
}

.modal__container {
  background-color: var(--bg-positive);
  width: 768px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

</style>