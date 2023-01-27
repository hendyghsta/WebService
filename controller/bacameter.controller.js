'use strict'

const resp = require('../utils/resp')
const con = require('../connection/sqlsvr')

exports.index = (req,res) => {
    resp.index("BacaMeter Controller", res)
}

exports.bebanbaca = (req, res) => {
    let q = `SELECT [NoSamb],[Nama],[Alamat],[Kode_Tarif],[Zona],[Stand_Lalu],[Kode_Pembaca],[koord],[Periode]
            FROM [BacaMeter].[dbo].[tblBebanBaca]
            WHERE [Kode_Pembaca] = @kodepembaca`

    resp.inq(con,req,res, q).input('kodepembaca',con.VarChar, req.query.kodepembaca)
}

exports.inputstand = (req, res) => {
    let namefile = ''
    if (req.file)
        namefile = req.file.namefile

    const transaction = new con.Transaction
    const request = new con.Request(transaction)

    let q = `INSERT INTO [dbo].[tblStand] ([NoSamb],[Periode],[Stand],[Kode_Status],[Kode_Pembaca],[Tanggal_Rekam],[Posx],[Poxy])
            VALUES
            (@nosamb,@periode,@stand,@status,@pembaca,@tgl,@posx,@posy)`

    request
        .input('nosamb', con.VarChar, req.body.nosamb)
        .input('periode', con.VarChar, req.body.periode)
        .input('stand', con.Int, req.body.stand)
        .input('status', con.VarChar, req.body.status)
        .input('pembaca', con.VarChar, req.body.pm)
        .input('tgl', con.VarChar, req.body.tgl)
        .input('posx', con.VarChar, req.body.px)
        .input('posy', con.VarChar, req.body.py)

    resp.post(req, res, q, transaction, request)
}