import type { App } from 'vue'
import NbButton from '../button'
import NbAlert from '../alert'
import NbIcon from '../icon'

export {
  NbButton,
  NbAlert,
  NbIcon
}

const install = (app: App): void => {
  NbButton(app),
  NbAlert(app),
  NbIcon(app)
}

const nbUI = {
  install
}

export default nbUI