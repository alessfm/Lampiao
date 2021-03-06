const {BrowserWindow, app, ipcMain, Notification} = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow(){
    const win = new BrowserWindow({
        width: 490,
        height: 640,
        backgroundColor: 'white',
        icon: '',
        webPreferences:{
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname,'preload.js')
        }
    })

    win.loadFile('index.html');
}

 // options menu when user left-click on icon
app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
  ])

  // to update on changes
if (isDev){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname,'node-modules','.bin','electron')
    })
}

 // to send notifications to Windows Users
ipcMain.on('notify',(e,message)=>{
    new Notification({title:'Ei!',body: message}).show();
})

app.whenReady().then(createWindow);