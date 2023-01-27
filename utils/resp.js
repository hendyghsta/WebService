'use strict'

exports.index = (val, res) => {
    let value = val.rowAffected > 0 ? val.recordset : val
    let data = {
        'status': 200,
        'data': value
    }

    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data, null, 2))
}

exports.ok = (val, res) => {
    if (val.rowAffected[0] > 0){
        let value = val.rowAffected[0] > 1 ? val.recordset : val.recordset[0]
        let data = {
            'success': true,
            'data': value
        }

        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(data, null, 2))
        
    }else{
        this.fail('No Record Found', res)
    }
}

exports.fail = (val,res) => {
    let data = {
        'success': false,
        'message': val
    }

    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data, null, 2))
}

exports.inq = (con,req,res,query) => {
    try {
        return con.query(query, (err, val) => {
            if (err){
                this.fail(err, res)
            }else{
                if (val.rowsAffected[0] > 0){
                    let data = {
                        'success': true,
                        'data': val.recordset
                    }

                    res.header('Content-Type', 'application/json')
                    res.send(JSON.stringify(data, null, 2))
                }else{
                    this.fail('No Recored found', res)
                }
            }
        })
    }catch(e){
        return this.fail(e.toString(), res)
    }
}

exports.post = (req, res, query, trans, request) => {
    let row = 0;
    return trans.begin(() => {
        let rollback = false;
        trans.on('rollback', aborted => {
            console.log('rollback aborted: '+aborted)
            rollback = true
        })

        request.query(query, (err, result) => {
            if (err){
                if (!rollback){
                    trans.rollback(err => {
                        row = 0
                        console.log('rollback: '+err)
                    })
                }
            }else{
                row = result.rowsAffected.length
                trans.commit(() => {
                    console.log('transaction commit')
                })
            }

            console.log(req.body)
            res.header('Content-Type', 'application/json')
            res.send(JSON.stringify(row, null, 2))
        })
    })
}