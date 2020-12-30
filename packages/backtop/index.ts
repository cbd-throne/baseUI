import { App } from 'vue'
import NbBacktop from './src/index.vue'

export default (app:App): void => {
  app.component(NbBacktop.name, NbBacktop)
}