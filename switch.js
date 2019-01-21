
const fs = require('fs')
const sourceFiles = {
  prefix: 'config',
  dev: 'dev.json',
  prod: 'prod.json'
}
//目标文件
const targetFiles = {
  prefix: 'src',
  filename: 'config.js'
}

// 获取命令行参数
const cliArgs = process.argv.splice(2)
const env = cliArgs[0]
// 判断是否是 prod 环境
const isDev = env.indexOf('dev') > -1 ? true : false
// console.log(isDev)
const configFile = __dirname + '/'+targetFiles.prefix + '/'+targetFiles.filename
const path = __dirname + '/'+ sourceFiles.prefix+'/'
const devFile = path + sourceFiles.dev
const prodFile = path + sourceFiles.prod
const merge = (prodEnv, devEnv) => {
  for (let i in prodEnv) {
    if (devEnv[i] !== undefined) {
      prodEnv[i] = devEnv[i]
    }
  }
  return prodEnv
}

fs.access(devFile, fs.constants.W_OK, (err) => {
    const prod = fs.readFileSync(prodFile, 'utf-8')
    let prodEnv = JSON.parse(prod)
    // console.log(!err && isDev)
    if (!err && isDev) {
        const dev = fs.readFileSync(devFile, 'utf-8');
        const devEnv = JSON.parse(dev)
        prodEnv = merge(prodEnv, devEnv)
    }
    const result = 'module.exports = ' + JSON.stringify(prodEnv, null, 2)
    fs.writeFileSync(configFile, result, 'utf8')
    console.log('写入成功！')
});
