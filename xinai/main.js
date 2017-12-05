const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const Menu = electron.Menu;

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

let template = [
    {
      label : 'New member',
      click:() => {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname,'index.html'),
            protocol:'file',
            slashes:true
          }))
        }
    },
      {
        label: 'Show member',
        click:() => {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname,'record.html'),
            protocol:'file',
            slashes:true 
          }))
        }
    }
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

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