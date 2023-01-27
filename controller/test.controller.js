'use strict'

const resp = require('../utils/resp')
const con = require('../connection/sqlsvr')

exports.index = (req,res) => {
    // res.send("Test Controller Oke!")
    resp.index("Test Utils Resp", res)
}

exports.db = (req, res) => {
    const q = `select * from BacaMeter.dbo.tblUser`
    resp.inq(con, req, res, q)
}