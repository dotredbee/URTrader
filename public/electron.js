const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')


const keyDb = require('./core/utils/db')('urkey.db')
const keyService = require('./core/service/keyService')(keyDb)
const Exupbit = require('./core/upbit/ExchangeUpbit')
const Upbit = require('./core/upbit/Upbit')
const authService = require('./core/service/AuthService')(keyService, Exupbit)

const upbit = new Upbit()

let mainWindow;
let exUpbit = null

function createWindow() {
  mainWindow = new BrowserWindow({
      //alwaysOnTop: true,
      center: true,
      //fullscreen: true,
      kiosk: !isDev,
      resizable: true,
      webPreferences: {
        nodeIntegrationInWorker: true,
        nodeIntegration : true,
        contextIsolation: false,
        preload : __dirname + '/preload.js'
      },
      width : 1280,
      height : 720,
      fullscreen: false,
  });

  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});



// ipcMain 

ipcMain.handle("sign:key", async (event, res) => {
 
  try{
    const ret = await authService.sign()

    if(!ret.ok) {
      return ret
    }

    exUpbit = ret.exupbit
    
    
    return {
      ok : true,
      access : ret.access,
      expire : ret.expire
    }
  }catch(err){ 
    return {
      ok : false,
      message : "업비트 키를 확인해 주세요."
    }
  }

  
})

ipcMain.handle("signin:key", async (event, res) => { 
  const ret = await authService.signIn({
    secret : res.secret
  })  

  if(!ret.ok){
    return ret
  }

  exUpbit = ret.exupbit
  
  return {
    ok : true,
    access : ret.access,
    expire : ret.expire
  }
})

ipcMain.handle("info:key", (event, res) => { 
  const data = authService.current()
  
  if(!data.ok) return data 
  
  return {
    ok : true,
    access : data.access,
    expire : data.expire
  }
})

ipcMain.handle("change:key", async (event, res) => { 
  const { access, secret } = res
})

ipcMain.handle("keys", async (event, res) => { 
  try{ 
      if(exUpbit === null) { 
          return {
              ok : false,
              message : "업비트 API키를 확인해주세요."
          }
      }
      
      const data = await exUpbit.getKeys()

      const current = authService.current()
      return {
           ok : true,
           data,
           current : current.access
      }
      
  }catch(err) { 
      return { 
          ok : false,
          message : err.message
      }
  }
})
const reduceAsk = (prev, current) => {
  let prevSize;
  if(prev.ask_size === undefined) {
    prevSize = prev
  }else{
    prevSize = prev.ask_size 
  }
  return prevSize + current.ask_size
}
const reduceBid = (prev, current) => {
  let prevSize;
  if(prev.bid_size === undefined) {
    prevSize = prev
  }else{
    prevSize = prev.bid_size 
  }
  return prevSize + current.bid_size
}
ipcMain.handle("orderbook", async (event, res) => {
  try{
    const { market } = res 

    const data = await upbit.getOrderBook({ markets : market })
    
    let units = data[0].orderbook_units.slice(0,  5)
    
    let ret = {
      ask : [],
      bid : [],
      total_ask_size : parseFloat(units.reduce(reduceAsk).toFixed(4)),
      total_bid_size : parseFloat(units.reduce(reduceBid).toFixed(4))
    }

    for(let i = 0; i < units.length; ++i){
      ret.ask.push({
        price : units[i].ask_price,
        size : units[i].ask_size
      })
      ret.bid.push({
        price : units[i].bid_price,
        size : units[i].bid_size
      })
    }
    return {
      ok : true,
      data : ret 
    }
  }catch(err) {
      return {
        ok : false,
        message : err.message
      }
  }
})

let cache = {} 
ipcMain.handle("markets", async (event, res) => {
  try{
      const data = await upbit.getMarkets({ isDetails : true})
      const keys = Object.keys(data) 
  
      let req = []
      let re = /^KRW*/
      for(let i = 0; i < keys.length; ++i) {
          if(re.test(data[i].market))
              req.push(data[i]) 
      }
      return {
          ok : true, 
          markets : req
      }
  }catch(err){
      return {
          ok : false,
          markets : []
      }
  }
  
})

ipcMain.handle("market:detail", async (event, res) => {
  if (cache[res]) {
      return {
          ok : true,
          detail : cache[res]
      }
  }
  try{
      const data = await upbit.getTickers({markets : res})
      const keys = Object.keys(data)

      let req = []
      for(let i = 0; i < keys.length; ++i){
          req.push(data[i])
      }


      cache[res] = req 
      setTimeout(() => {
          delete cache[res]
      }, 600)
      return {
          ok : true,
          detail : req
      }
  }catch(err){
      return {
          ok : false,
          detail : undefined
      }
  }
})

