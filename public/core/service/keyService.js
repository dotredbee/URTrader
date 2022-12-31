const {strategy} = require('../utils/strategy')

module.exports = (db) => {
    
    const keyService = {}
    keyService.is = function(cb){
        let sql = `SELECT * FROM main`
        
        db.all(sql, [], (err, rows) => { 
            if(err){
                return cb(false, [])
            }
            
            if(rows.length === 0) return cb(false, []) 
            cb(true, rows)
        })
    }
    
    keyService.signIn = function(access, secret, expire) {
        const query = `INSERT INTO main values('${access}', '${secret}', '${expire}')`
        try{
            console.log(query)
            db.serialize()
            db.each(query)
            return true
        }catch(err){ 
            throw err
        }
    }


    return keyService
}