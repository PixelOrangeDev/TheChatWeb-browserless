const {app, BrowserWindow, Menu} = require('electron')
const shell = require('electron').shell
const path = require('path')
const url = require('url')

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 900, height: 500})
  win.setMinimumSize(750, 450);
  
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/src/TCW-app.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  
  var menu = Menu.buildFromTemplate([
      {
          label: 'TheChatWeb',
          submenu: [
            {label:'Use Web Edition', click(){shell.openExternal('https://TheChatWeb.zapto.org')}, accelerator:'CmdOrCtrl+W'},
            
            {type:'separator'},
            {label:'Exit', click(){app.quit()}, accelerator:'CmdOrCtrl+E'}
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 
  
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})