import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { setupCalendar } from 'v-calendar'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(setupCalendar, {})
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')