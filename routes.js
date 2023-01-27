const constant = require('./const')
const storage = require('./utils/storage.helper')

const rootPath = constant.rootPath

module.exports = (app) => {
    const test = require('./controller/test.controller')
    app.route(rootPath+ '/test').get(test.index)
    app.route(rootPath+ '/db').get(test.db)

    const user = require('./controller/user.controller')
    app.route(rootPath+ '/user').get(user.index)
    app.route(rootPath+ '/user/login').get(user.login)

    const helper = require('./controller/helper.controller')
    app.route(rootPath+ '/helper').get(helper.index)
    app.route(rootPath+ '/helper/status_meter').get(helper.status_meter)

    const bacameter = require('./controller/bacameter.controller')
    app.route(rootPath+ '/bacameter').get(bacameter.index)
    app.route(rootPath+ '/bacameter/bebanbaca').get(bacameter.bebanbaca)
    app.route(rootPath+ '/bacameter/inputstand').post(storage.uploadBacameter.single('namefile'), bacameter.inputstand)
}