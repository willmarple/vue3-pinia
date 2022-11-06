<template>
  <div class="details__wrapper">
    <div class="details">
      <template v-for="detail in details" :key="detail.key">
        <span class="detail__key">{{ detail.key }}:</span>
        <span class="detail__value">{{ detail.value }}</span>
      </template>
    </div>
    <div class="detail__controls">
      <button class="button"
              :class="{danger: isInCurrentList}"
              type="button"
              @click="addOrRemoveMovie"
              v-html="controlText"></button>
      <button class="button close" type="button" @click="modalStore.close">close</button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useListControls} from "./use/useListControls.js";
import {useModalStore} from "../store/useModalStore.js";

const modalStore = useModalStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const details = computed(() => Object.entries(props.movie).reduce((acc, entry) => {
      if (!['Ratings', 'Poster', 'playlist'].includes(entry[0])) {
        acc.push({
          key: entry[0],
          value: entry[1]
        })
      }

      return acc;
    }, [])
);

const {
  isInCurrentList,
  addMovieToCurrentList,
  removeMovieFromCurrentList
} = useListControls(props.movie);

const controlText = computed(() => isInCurrentList.value ? 'remove' : 'add');

function addOrRemoveMovie() {
  if (isInCurrentList.value) {
    // noinspection JSValidateTypes
    removeMovieFromCurrentList(props.movie);
  } else {
    // noinspection JSValidateTypes
    addMovieToCurrentList(props.movie);
  }
  modalStore.close();
}
</script>

<style scoped>
.details__wrapper {
  position: relative;
}

.details {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 16px;
  row-gap: 8px;
  padding: 24px;
}

.details > * {
  display: block;
}

.detail__key {
  text-align: right;
}

.detail__value {
  display: inline-block;
}

.detail__controls {
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 24px;
  background-color: var(--bg-positive);
  border-top: 1px solid var(--border);
  transform: translateY(1px);
}
</style>