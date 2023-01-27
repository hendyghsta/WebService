'use strict'

const resp = require('../utils/resp')
const con = require('../connection/sqlsvr')

exports.index = (req,res) => {
    resp.index("Helper Controller", res)
}

exports.status_meter = (req, res) => {
    let q = `SELECT [Kode_Status],[Nama_Status],[Aktif]
            FROM [BacaMeter].[dbo].[tblStatus]`

    resp.inq(con, req, res, q)
}