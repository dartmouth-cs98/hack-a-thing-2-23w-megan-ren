const { app, BrowserWindow, BrowserView, ipcMain, Notification } = require('electron')

const path = require('path')
const url = require('url')

let mainWindow 

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  mainWindow.on('closed', function() {
    mainWindow = null;
  })

  const view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 500, height: 500 })
  view.webContents.loadURL('https://electronjs.org')

}

app.whenReady().then(() => {
  createWindow()
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
