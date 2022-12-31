const CryptoJS = require('crypto-js')

exports.strategy = {
    encrypt : (data, secret) => CryptoJS.AES.encrypt(data, secret).toString(),
    decrypt : (data, secret) => CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8),
}