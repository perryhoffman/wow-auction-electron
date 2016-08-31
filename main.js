// Install

if(require('electron-squirrel-startup')) return;

// App

const electron = require('electron')
const app = electron.app

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const BrowserWindow = electron.BrowserWindow


let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 760})
  
  BrowserWindow.addDevToolsExtension('C:\\Users\\Alex Cheuk\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\2.1.2_0')
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:8080`);

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

