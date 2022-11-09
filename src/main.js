import {createApp} from "vue";
import {createPinia, setMapStoreSuffix} from "pinia";
import App from "./App.vue";
import "./style.css";

// Global Components
import MovieDetails from "./components/MovieDetails.vue";
import CurrentPlaylistStats from "./components/CurrentPlaylistStats.vue";

setMapStoreSuffix('')

const app = createApp(App).use(createPinia());

app.component('MovieDetails', MovieDetails);
app.component('CurrentPlaylistStats', CurrentPlaylistStats);

app.mount("#app");