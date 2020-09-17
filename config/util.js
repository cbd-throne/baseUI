const fs = require('fs')
const path = require('path')

const cwd = process.cwd() // 当前进程的路径

function getProjectPath (...filePath) {
  return path.join(cwd, ...filePath)
}

function resolve(moduleName) {
  return require.resolve(moduleName);
}

module.exports = {
  getProjectPath,
  resolve
}