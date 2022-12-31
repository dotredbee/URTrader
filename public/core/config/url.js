class URL {
    UPBIT_SERVER_URL = `https://api.upbit.com/v1`

    
    // 계좌 조회 
    UPBIT_ACCOUNTS = `${this.UPBIT_SERVER_URL}/accounts`

    // 종목 조회
    UPBIT_MARKET = `${this.UPBIT_SERVER_URL}/market/all`

    // 캔들 조회 (1분)
    UPBIT_CANDLE_MINUTES = `${this.UPBIT_SERVER_URL}/candles/minutes/1`

    // 티커 조회
    UPBIT_TICKERS = `${this.UPBIT_SERVER_URL}/ticker`

    // 주문 삭제
    UPBIT_CANCEL_ORDER = `${this.UPBIT_SERVER_URL}/order`

    // 주문
    UPBIT_ORDERS = `${this.UPBIT_SERVER_URL}/orders`

    // 주문 가능 조회 
    UPBIT_CHANCE = `${this.UPBIT_SERVER_URL}/orders/chance`

    UPBIT_KEYLIST = `${this.UPBIT_SERVER_URL}/api_keys`

    // 오더북 조회
    UPBIT_ORDERBOOK = `${this.UPBIT_SERVER_URL}/orderbook`
}

exports.URL = new URL()