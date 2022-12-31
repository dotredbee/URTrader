const CustomAxios = require('./CustomAxios')

const { URL } = require('../config/url')

module.exports = class Upbit extends CustomAxios{
    constructor() {
        super()
    }
    
    async getMarkets({isDetails = true}){
        try {
            const { data } = await super.getData({
                method : "GET",
                url : `${URL.UPBIT_MARKET}?isDetails=${isDetails}`
            })

            return data
        }catch(err) {
            const {
                response : { data },
              }= err;
            throw data;
        }
    }

    async getCandleMinutes({
        market,
        to,
        count,
    }) {
        try{
            const url = 
            `${URL.UPBIT_CANDLE_MINUTES}?market=${market}${count ? `&count=${count}` : ""}${to ? `&to=${to}` : ""}`
            
            const { data } = await super.getData({
                method : "GET",
                url,
            })
            
            return data
        }catch(err) {
            const {
                response : { data }
            }= err
            
            throw data
        }
    }

    async getTickers({
        markets
    }) {
        try{ 
            const { data } = await super.getData({
                method : "GET",
                url : `${URL.UPBIT_TICKERS}?markets=${markets}`
            })

            return data
        }catch(err) {
            const {
                response : { data }
            } = err
            
            throw data
        }
    }

    async getOrderBook({
        markets,
    }){
        try{
            const { data } = await super.getData({
                method : "GET",
                url : `${URL.UPBIT_ORDERBOOK}?markets=${markets}`
            })

            return data
        }catch(err) {
            const { 
                response : { data }
            } = err

            throw data 
        }
    }
} 