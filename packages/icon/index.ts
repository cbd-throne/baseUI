import NbIcon from './src/index.vue'
import { App } from 'vue'

export default (app: App) => {
  app.component(NbIcon.name, NbIcon)
}