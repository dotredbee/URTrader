const CustomAxios = require('./CustomAxios')

const { URL } = require('../config/url')

module.exports = class ExchangeUpbit extends CustomAxios{
    // eslint-disable-next-line no-useless-constructor
    constructor(UPBIT_ACCESS_KEY, UPBIT_SECRET_KEY){
        super(UPBIT_ACCESS_KEY, UPBIT_SECRET_KEY)
    }
    changeIntoList(data) {
        const keys = Object.keys(data)
        
        let ret = []
        for(let i = 0; i < keys.length; i++)
            ret.push(data[i])
        
        return ret
    }
    /** 
     * 현재 보유 금액 조회
     * @return Promise<IGetAccountsProps[]>
     */
    async getAccounts(){
        try {
            const { data } = await super.getAuthData({
                method : "GET",
                url : URL.UPBIT_ACCOUNTS,
            })

            return data
        }catch(err) {
            const {
                response : { data } 
            } = err
            
            throw data
        }
    }

    async cancelOrder({
        uuid 
    }){
        try{
            const { data } = await super.getAuthParamData({
                method : "DELETE",
                url : URL.UPBIT_CANCEL_ORDER,
                params : {
                    uuid : uuid
                }
            })
    
            return data 
        }catch(err){
            const {
                response : { data }
            } = err

            throw data
        }
    };

    async getOrder({
        market,
        state = "wait",
        order_by = "desc",
        page = 1        
    }) {
        try{
            const { data } = await super.getAuthParamData({
                method : "GET",
                url : URL.UPBIT_ORDERS,
                params : {
                    market,
                    state,
                    page,
                    order_by
                }
            })
    
            return this.changeIntoList(data)
        }catch(err) {
            const {
                response : { data }
            } = err
            throw data
        }

    }

    async buyLimitOrder({
        market,
        price,
        volume
    }){
        try{
            const { data } = await super.getAuthParamData({
                method : "POST",
                url : URL.UPBIT_ORDERS,
                params : {
                    market,
                    side : "bid",
                    volume,
                    price,
                    ord_type : "limit"
                }
            })

            return data
        }catch(err){
            const {
                response : { data }
            } = err
            throw data
        }
    }


    async buyMarketOrder({
        market,
        price
    }){
        try{
            const { data } = await super.getAuthParamData({
                method : "POST",
                url : URL.UPBIT_ORDERS,
                params : {
                    market,
                    side : "bid",
                    price,
                    ord_type : "price"
                }
            })
            return data
        }catch(err){
            const {
                response : { data }
            } = err
            throw data
        }
    }

    async sellMarketOrder({
        market,
        volume
    }){
        try { 
            const { data } = await super.getAuthParamData({
                method : "POST",
                url : URL.UPBIT_ORDERS,
                params : {
                    market,
                    side : "ask",
                    volume,
                    ord_type : "market"
                }
            })

            return data
        }catch(err) { 
            const {
                response : { data }
            } = err
            throw data
        }
    }

    async sellLimitOrder({
        market,
        price,
        volume,
    }){
        try {
            const { data } = await super.getAuthParamData({
                method : "POST",
                url : URL.UPBIT_ORDERS,
                params : {
                    market,
                    side : "ask",
                    volume,
                    price,
                    ord_type : "limit"
                }
            })

            return data
        }catch(err){
            const {
                response : { data }
            } = err

            throw data 
        }
    }

    async getMarketChance({
        market
    }){
        try{
            const { data } = await super.getAuthParamData({
                method : "GET",
                url : URL.UPBIT_CHANCE,
                params : {
                    market
                }
            })
            
            return data
        }catch(err) {
            const {
                response : { data }
            } = err
            throw data
        }
    }

    async getKeys(){
        try{
            const { data } = await super.getAuthData({
                method : "GET",
                url : URL.UPBIT_KEYLIST
            })

            return data
        }catch(err){
            const {
                response : { data }
            } = err
            throw data
        }
    }
}