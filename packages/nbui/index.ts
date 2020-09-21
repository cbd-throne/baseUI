import type { App } from 'vue'
import NbButton from '../button'

export {
  NbButton
}

const install = (app: App): void => {
  NbButton(app)
}

const nbUI = {
  install
}

export default nbUI