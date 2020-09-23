import { App } from 'vue'

import NbAlert from './src/alert.vue';

export default (app: App) => {
  app.component(NbAlert.name, NbAlert)
}

