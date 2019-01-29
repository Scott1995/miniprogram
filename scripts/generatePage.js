// generatePage.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { wxmlTemplate, jsTemplate, wxssTemplate, jsonTemplate } = require('./template')
const appJsonFile = '../xwt/src/app.json'

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
log('请输入要生成的页面名称')
process.stdin.on('data', async chunk => {
  const name = String(chunk).trim().toString()
  var pageName = name.split('-')[0];
  var titleName = name.split('-')[1];
  /**
   * 页面目录路径
   */
  const componentDirectory = resolve('../src/pages', pageName)

  /**
   * wxml文件路径
   */
  const wxmlName = resolve(componentDirectory, `${pageName}.wxml`)
  /**
   * wxss文件路径
   */
  const wxssName = resolve(componentDirectory, `${pageName}.wxss`)
  /**
   * json文件路径
   */
  const jsonName = resolve(componentDirectory, `${pageName}.json`)
  /**
   * js文件路径
   */
  const jsName = resolve(componentDirectory, `${pageName}.js`)

  const hasComponentDirectory = fs.existsSync(componentDirectory)
  if (hasComponentDirectory) {
    errorLog(`${pageName}目录已存在，请重新输入`)
    return
  } else {
    log(`正在生成 page 目录 ${componentDirectory}`)
    await dotExistDirectoryCreate(componentDirectory)
    // fs.mkdirSync(componentDirectory);
  }
  try {
    log(`正在生成 wxml 文件 ${wxmlName}`)
    await generateFile(wxmlName, wxmlTemplate(pageName))
    log(`正在生成 wxss 文件 ${wxssName}`)
    await generateFile(wxssName, wxssTemplate)
    log(`正在生成 json 文件 ${jsonName}`)
    await generateFile(jsonName, jsonTemplate(titleName))
    log(`正在生成 js 文件 ${jsName}`)
    await generateFile(jsName, jsTemplate)
    successLog('生成成功')
    const appJson = JSON.parse(fs.readFileSync(appJsonFile, 'utf-8'));
    appJson.pages.push(`pages/${pageName}/${pageName}`)
    fs.writeFileSync(appJsonFile, JSON.stringify(appJson), 'utf8')
    successLog('app.json写入成功！')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})
function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

