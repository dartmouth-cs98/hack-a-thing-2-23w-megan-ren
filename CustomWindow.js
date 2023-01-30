const { app, BrowserWindow, BrowserView, ipcMain, systemPreferences } = require('electron')
const path = require('path')


class CustomWindow {

  constructor(width, height, devTools) {
    this.win = new BrowserWindow({
      width: width,
      height: height,
      title: "Better Browser!",
      webPreferences: {
        preload: path.join(__dirname, "preload.js")
      }
    });

    this.customViews = [];

    this.win.loadFile('index.html');

    this.win.once('ready-to-show', () => {
      this.win.show();
    });


    if (devTools) {
      this.win.webContents.openDevTools({mode: 'undocked'})
    }

  }

  initTab(view) {
    this.customViews.push(view);
  }

  addTabAndSwitch(view) {
    try {
      this.customViews.push(view);
      let message = [];
      this.customViews.forEach((customView, index) => {
        message.push({
          title: customView.view.webContents.getTitle(),
          index: index
        })
      });
      console.log(message);
      this.win.webContents.send('newTabCreated', message);
    } catch (error) {
      console.error(error);
    }
    this.switchTab(this.customViews.length - 1);
  }

  switchTab(index) {
    this.win.addBrowserView(this.customViews[index].view);
  }


  getSize() {
    return this.win.getSize();
  }
}

module.exports = CustomWindow;
