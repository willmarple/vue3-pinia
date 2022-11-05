<template>
  <div class="form">
    <input class="form__input" :value="searchTerm" @input="search" type="text"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {userMovieStore} from "../store/userMovieStore.js";
import {debounce} from "lodash";

const searchTerm = ref("");
const store = userMovieStore();

const search = debounce(function (e) {
  store.searchMovie(e.target.value);
}, 500);
</script>

<style scoped>
.form {
  width: 800px;
  display: flex;
  justify-content: center;
}

.form__input {
  border: 1px solid #929292;
  border-radius: 4px;
  padding: 16px 8px;
  margin-top: 25px;
  margin-bottom: 15px;
  height: 20px;
  width: 50%;
}

button {
  margin-left: 30px;
  background-color: #2f6089;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  color: white;
  width: 15%;
}

.alert-div {
  min-height: 25px;
}

.alert {
  color: #d1495b;
  font-size: 1em;
  font-weight: 600;
}
</style>
