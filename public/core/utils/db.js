const sqlite3 = require('sqlite3')
const path = require('path')

module.exports = (dbName) => { 
    try{
        const _path = path.join(__dirname, `../..//db/${dbName}`)
        console.log(_path)
        let db = new sqlite3.Database(_path)
        
        console.log(`Connected ${dbName} database`)
        return db
    }catch(err) {
        
        console.error(err.message)
        return null        
    }
}