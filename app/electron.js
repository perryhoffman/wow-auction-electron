// Install
// if (require('electron-squirrel-startup')) return

// App
const electron = require('electron')
const path = require('path')

const app = electron.app

app.commandLine.appendSwitch('ignore-certificate-errors', 'true')

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 860,
    webPreferences: {
      webSecurity: false
    }
  })

  // BrowserWindow.addDevToolsExtension('C:\\Users\\Alex Cheuk\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\2.1.2_0')
  // BrowserWindow.addDevToolsExtension('C:\\Users\\Alex Cheuk\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\2.1.2_0')
  if (process.env.NODE_ENV === 'development') {
    require('devtron').install()
    mainWindow.loadURL(`http://localhost:8080`)
  }else{
    mainWindow.loadURL(`electron://index.html`)
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('devtools-opened', () => {
      setImmediate(() => {
        mainWindow.focus()
      })
    })
    mainWindow.openDevTools()
  }
}

app.on('ready', createWindow)

app.on('ready', () => {
  electron.protocol.registerFileProtocol('electron', (request, callback) => {
    const url = request.url.substr(11)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// APPLICATION
let loginWindow = null
let loginInterval = null

function showLoginPopup () {
  loginWindow = new BrowserWindow({
    width: 1024,
    height: 760,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false
    }
  })
  loginWindow.loadURL('https://us.battle.net/login/en/')

  loginWindow.on('closed', () => {
    clearInterval(loginInterval)
    loginWindow = null
  })

  loginInterval = setInterval(function () {
    let url = loginWindow.getURL()

    if (/account\/management/.test(url.split('?')[0])) {
      loginWindow.close()

      mainWindow.webContents.send('login-success')
    }
  }, 500)
}

electron.ipcMain.on('login-popup', (event, arg) => {
  showLoginPopup()
})
