import { addDecorator } from '@storybook/html'
import { createApp } from 'vue'
import '../packages/theme/src/index.scss'
import NbUI from '../packages/nbui'
import './demo.css'

const Wrapper = (template) => {
  return {
    data() {
      return {}
    },
    template,
  }
}

function CustomDecorator(content, context) {
  const templateOrComponent = content()
  const app = typeof templateOrComponent === 'string'
    ? createApp(Wrapper(templateOrComponent))
    : createApp(templateOrComponent)
  NbUI.install(app)
  const entry = document.createElement('div')
  entry.className = 'nbui-plus-previewer'
  app.mount(entry)
  return entry
}

addDecorator(CustomDecorator);