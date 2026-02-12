import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/main.css'

// Auto dark mode detection
const mql = window.matchMedia('(prefers-color-scheme: dark)')
function applyColorScheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}
applyColorScheme(mql.matches)
mql.addEventListener('change', (e) => applyColorScheme(e.matches))

const app = createApp(App)
app.use(router)
app.mount('#app')
