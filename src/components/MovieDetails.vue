<template>
  <div class="details">
    <template v-for="detail in details" :key="detail.key">
      <span class="detail__key">{{ detail.key }}:</span>
      <span class="detail__value">{{ detail.value }}</span>
    </template>
  </div>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const details = computed(() => Object.entries(props.movie.details).reduce((acc, entry) => {
      if (!['Ratings', 'Poster'].includes(entry[0])) {
        acc.push({
          key: entry[0],
          value: entry[1]
        })
      }

      return acc;
    }, [])
);

console.log('MOVIE DETAILS', details.value);
</script>

<style scoped>
.details {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 24px;
  row-gap: 8px;
}

.details > * {
  display: block;
}

.detail__value {
  display: inline-block;
}
</style>