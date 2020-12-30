import type { App } from 'vue'
import NbButton from '../button'
import NbAlert from '../alert'
import NbIcon from '../icon'
import NbAvatar from '../avatar'

export {
  NbButton,
  NbAlert,
  NbIcon,
  NbAvatar
}

const install = (app: App): void => {
  NbButton(app);
  NbAlert(app);
  NbIcon(app);
  NbAvatar(app);
}

const nbUI = {
  install
}

export default nbUI