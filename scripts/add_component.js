const fs = require('fs')
const path = require('path')

const pwd = process.cwd()

const args = process.argv.slice(2)

const CompPath = path.resolve(pwd, 'packages', args[0])

console.log(CompPath)

const storyTemp = `
export default {
  title: ''
}
export { default as BasicUsage } from './demo.vue'
`

try {
  fs.mkdirSync(CompPath + '/src', { recursive: true })
  fs.mkdirSync(CompPath + '/doc', { recursive: true })
  fs.writeFileSync(CompPath + '/package.json', JSON.stringify({ "name": `nbui-${args[0]}`, "main": "index.js"}))
  fs.writeFileSync(CompPath + '/index.ts', `import { App } from vue;`)
  fs.writeFileSync(CompPath + '/src/index.vue', '')
  fs.writeFileSync(CompPath + '/doc/demo.vue', '')
  fs.writeFileSync(CompPath + '/doc/index.stories.ts', storyTemp)
} catch(e) {
  console.log(e)
}