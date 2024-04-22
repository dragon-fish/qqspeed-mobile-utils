import App from './App.vue'
import 'uno.css'
import './styles/index.sass'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue, {})

app.mount('#app')
