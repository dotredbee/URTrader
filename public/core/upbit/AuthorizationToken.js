const { sign } = require('jsonwebtoken')
const { v4 } = require('uuid')

const sha512 = require('crypto-js/sha512')

const queryString = require('../utils/queryString')

module.exports = class AuthorizationToken{
    constructor(UPBIT_ACCESS_KEY, UPBIT_SECRET_KEY) {
        this.UPBIT_ACCESS_KEY = UPBIT_ACCESS_KEY || ""
        this.UPBIT_SECRET_KEY = UPBIT_SECRET_KEY || ""
    }

    Validation() { 
        if(this.UPBIT_ACCESS_KEY === "" || this.UPBIT_SECRET_KEY === ""){
            return false
        }
        return true
    }

    getAuthorizationTokenNoParam() {
        if(!this.Validation())
            throw new Error("You have the wrong api-key of upbit")
        
        const payload = {
            access_key : this.UPBIT_ACCESS_KEY,
            nonce : v4()
        }
        
        const jwtToken = sign(payload, this.UPBIT_SECRET_KEY)
        return `Bearer ${jwtToken}`
    }

    getAuthorizationToken(params) {
        if(!this.Validation())
            throw new Error("You have the wrong api-key of upbit")

        // const query = querystring.encode(params)
        // const hash = crypto.createHash("sha512")
        // const queryHash = hash.update(query, "utf-8").digest("hex")
        
        const query = queryString(params)
        const queryHash = sha512(query).toString()


        const payload = {
            access_key : this.UPBIT_ACCESS_KEY,
            nonce : v4(),
            query_hash : queryHash,
            query_hash_alg : "SHA512" 
        }

        const jwtToken = sign(payload, this.UPBIT_SECRET_KEY)
        
        return {
            authorizationToken : `Bearer ${jwtToken}`,
            query
        }
    }
}