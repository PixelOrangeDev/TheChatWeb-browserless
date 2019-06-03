const {app, BrowserWindow, Menu} = require('electron')
const shell = require('electron').shell
const path = require('path')
const url = require('url')

let win

function createWindow () {
    
  // Create the browser window.
  win = new BrowserWindow({ backgroundColor: '#717171', show: false, width: 900, height: 500})
  win.setMinimumSize(750, 450);
  
  // and load the index.html of the app.
  win.loadURL('https://thechatweb.zapto.org/89bca5cc1a7441b3ef21f6f7bbea153a')
  
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
            {label:'Reload', click(){win.reload()}, accelerator:'CmdOrCtrl+R'},
            
            {type:'separator'},
            {label:'Exit', click(){app.quit()}, accelerator:'CmdOrCtrl+E'}
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 
  
  win.once('ready-to-show', () => {
    win.show()
  })
  
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