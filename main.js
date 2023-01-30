const { app, BrowserWindow, BrowserView, ipcMain, Notification } = require('electron')
// const { Window } = require('./Window')

const path = require('path')
const url = require('url')
// const Window = require('./Window')
const CustomWindow = require('./CustomWindow')
const CustomView = require('./CustomView')
const electronReload = require('electron-reload')

let browserViews = [];

const createWindow = () => {
  win = new CustomWindow(1600, 900, true);
  const [width, height] = win.getSize();
  view = new CustomView(width, height, 100, win.win);
  win.initTab(view);
}

ipcMain.on('openNewTab', () => {
  let newView = new CustomView(1600, 900, 100, win.win);
  win.addTabAndSwitch(newView);
});

app.on("ready", () => {
  createWindow();
})

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
  if (win === null) {
    createWindow()
  }
});
