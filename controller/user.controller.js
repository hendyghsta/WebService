'use strict'

const resp = require('../utils/resp')
const con = require('../connection/sqlsvr')

exports.index = (req,res) => {
    resp.index("User Controller", res)
}

exports.login = (req, res) => {
    const q = `select username, kode_pembaca, tanggal from bacameter.dbo.tblUser
                where username = @username and password = @password and aktif = 1`
    resp.inq(con, req, res, q)
        .input('username', con.VarChar, req.query.user)
        .input('password', con.VarChar, req.query.pass)
}