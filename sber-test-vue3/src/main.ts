import { createApp } from 'vue'
import App from './App.vue'
import Typography from './components/typography/Typography.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/styles/index.scss'
import { store } from './store'

const app = createApp(App)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('typography', Typography)

app.mount('#app')
