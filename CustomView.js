const { app, BrowserWindow, BrowserView, ipcMain, systemPreferences } = require('electron')
const path = require('path')

class CustomView {
    constructor(width, height, tabHeight, win) {
        this.view = new BrowserView({
            webPreferences: {
                scrollBounce: true,
                javascript: true,
                webSecurity: true,
                navigateOnDragDrop: true
            }
        });

        this.win = win;

        win.addBrowserView(this.view);
        this.view.setBounds({ x: 0, y: tabHeight, width: width, height: height - tabHeight });
        this.view.setAutoResize({width: true, height: true});
        this.view.setBackgroundColor('#FFFFFF');

        this.view.webContents.loadURL('https://google.com/');

        ipcMain.on('searchBarQueryEntered', (_event, query) => {
            console.log("HERE")
            console.log(query);
            this.view.webContents.loadURL(query);
        });

        ipcMain.on('goBack', () => {
            this.view.webContents.goBack();
        });

        ipcMain.on('goForward', () => {
            this.view.webContents.goForward();
        });

        ipcMain.on('refresh', () => {
            this.view.webContents.reload();
        });

        this.view.webContents.setWindowOpenHandler((details) => {
            this.view.webContents.loadURL(details.url);
            return { action: 'deny' };
        })

        this.view.webContents.on('did-navigate', (event, url) => {
            win.webContents.send('setSearchBarURL', url);
        })

        // this.view.webContents.on('did-finish-load', (event) => {
        //     console.log("did finish load");
        // })
        
    }

    
}

module.exports = CustomView