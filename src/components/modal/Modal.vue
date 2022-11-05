<template>
  <teleport to="body">
    <div class="modal__background" @click="modalStore.close">
      <div class="modal__container" @click.stop>

        <component :is="modalStore.component" :="modalStore.props"></component>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {useModalStore} from "../../store/useModalStore.js";
import {computed} from "vue";

const modalStore = useModalStore();
console.log('INIT MODAL', JSON.stringify(modalStore.component))
const modalOpen = computed(() => modalStore.modalOpen);
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
  background-color: rgba(255, 255, 255, 1);
  width: 768px;
  padding: 24px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
}

</style>