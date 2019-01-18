var prodEnv = require('../config/prod.env.js')
var devEnv = require('../config/dev.env.js')

const merge = (prodEnv, devEnv) => {
  for (let i in prodEnv) {
    if (devEnv[i] !== undefined) {
      prodEnv[i] = devEnv[i]
    }
  }
  return prodEnv
}

let conf = merge(prodEnv, devEnv)


class Config
{
  constructor()
  {

  }
}


Config.restUrl = [conf.DOMAIN, conf.PREFIX].join('/') + '/'
Config.accept = 'application/' + [conf.API_STANDARDS_TREE, conf.API_SUBTYPE, conf.API_VERSION].join('.')+'+json'

export {Config};