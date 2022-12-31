const axios = require('axios')

const AuthorizationToken = require('./AuthorizationToken')


module.exports = class CustomAxios extends AuthorizationToken {
    // eslint-disable-next-line no-useless-constructor
    constructor(UPBIT_ACCESS_KEY, UPBIT_SECRET_KEY) {
        super(UPBIT_ACCESS_KEY, UPBIT_SECRET_KEY)
    }

    async getData({
        method,
        url
    }){
        const res = await axios({
            method,
            url,
        })
        return res
    }

   
    async getAuthData({
        method,
        url,
    }){
        const authorizationToken = super.getAuthorizationTokenNoParam()

        const res = await axios({
            method,
            url,
            headers : { Authorization: authorizationToken }
        })

        return res
    }

    async getAuthParamData({
        method,
        url,
        params = {},
    }){
        
        const { authorizationToken, query } = super.getAuthorizationToken(params)
            
        const res = await axios({
            method,
            url : `${url}?${query}`,
            headers : { Authorization: authorizationToken },
        })
    
        return res
        
    }
}