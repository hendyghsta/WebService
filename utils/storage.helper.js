'use strict'

const multer = require('multer')
const path = require('path')
const fs = require('fs')

global.appRoot = path.resolve(__dirname)

function saveFile(dir) {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }

            callback(null, dir)
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    })
}

module.exports.uploadBacameter = multer({storage: saveFile('C:/photo')}) // path upload photo