import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import "./style.css";

// Global Components
import MovieDetails from "./components/MovieDetails.vue";

const app = createApp(App).use(createPinia());

app.component('MovieDetails', MovieDetails);

app.mount("#app");