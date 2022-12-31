
module.exports = (keyService, ExUpbit) => {
    const authService = {}
    
    /*
        사용 시 본인에게 맞는 API KEY 를 기입해주세요.
    */
    const acKey = "여기에 입력해 주세요."
    
    let currentKey = null;
    let currentKeyExpire = null;

    authService.sign = () => {
        return new Promise((resolve, reject) => {
            keyService.is(async (ret, rows) => {
                // DB 연결이 실패되었거나, 저장된 키가 없을경우 
                if(!ret || rows.length === 0) {
                    return resolve({
                        ok : false,
                        message : "데이터베이스에서 값을 불러오는데 실패했습니다."
                    })
                } 
        
                // 키가 존재할 경우
                console.log(rows)
                    
                    
                try{
                    const { accessKey, secretKey, expire } = rows[0]
                    
                    const upbit = new ExUpbit(accessKey, secretKey)
                    await upbit.getKeys()
                    
                    currentKey = accessKey
                    currentKeyExpire = expire
                    resolve({
                        ok : true,
                        access : accessKey,
                        expire, 
                        exupbit : upbit,
                    })
                    
                }catch(err) { 
                    // Exupbit 연결이 이루어지지 않음
                    return resolve({
                        ok : false,
                        message : "업비트 키를 확인해주세요."
                    })
                }
            })
        })
        
    }
    authService.signIn = async ({ access = acKey, secret}) => {
        try{
            console.log(access)
            const upbit = new ExUpbit(access, secret)
            
            const data = await upbit.getKeys()
            let expire = ""
            for(let i = 0; i < data.length; ++i) {
                if(access === data[i].access_key){
                    expire = data[i].expire_at
                    break
                }
            }
            if(expire === ""){
                return {
                    ok : false,
                    message : "not matched"
                }
            }
            const date = new Date(expire)
            expire = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` 
            keyService.signIn(access, secret, expire) 
            
            currentKey = access
            currentKeyExpire = expire
            return {
                ok : true, 
                exupbit : upbit,
                access,
                expire,
            }
        }catch(err){
            return {
                ok : false,
                message : err.message     
            }
        }
    }

    authService.current = () => {
        if(currentKey === null || currentKeyExpire === null){
            return {
                ok : false,
                message : "등록된 업비트 APIKEY가 없습니다."
            }
        }

        return {
            ok : true,
            access : currentKey,
            expire : currentKeyExpire,
        }
    }
    authService.change = async (access, secret) => {
        const query = ``
    }
    return authService 
}