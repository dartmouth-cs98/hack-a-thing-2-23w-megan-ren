const { contextBridge, ipcRenderer, IpcRendererEvent } = require('electron')

contextBridge.exposeInMainWorld('api', {
  handleSetSearchBarURL: (callback) => ipcRenderer.on('setSearchBarURL', callback),
  searchBarQueryEntered: (query) => {
    ipcRenderer.send('searchBarQueryEntered', query);
    console.log("inside here");
  },
  backButtonPressed: () => ipcRenderer.send('goBack'),
  forwardButtonPressed: () => ipcRenderer.send('goForward'),
  refreshButtonPressed: () => ipcRenderer.send('refresh')
});

contextBridge.exposeInMainWorld('tabs', {
  newTab: () => ipcRenderer.send('openNewTab'),
  handleNewTabOpened: (callback) => ipcRenderer.on('newTabCreated', callback),
});

// contextBridge.exposeInMainWorld('api', {

//     titleBarClicked: () => ipcRenderer.send('closeSettings'),

//     handleRemoveLeftMargin: (callback) => ipcRenderer.on('removeLeftMargin', callback),
//     handleRestoreLeftMargin: (callback) => ipcRenderer.on('restoreLeftMargin', callback),

//     handleSetSearchBar: (callback) => ipcRenderer.on('setSearchBar', callback),
//     handleSetSearchBarURL: (callback) => ipcRenderer.on('setSearchBarURL', callback),

//     backButtonPressed: () => ipcRenderer.send('goBack'),
//     forwardButtonPressed: () => ipcRenderer.send('goForward'),
//     refreshButtonPressed: () => ipcRenderer.send('refreshPage'),

//     handleLockButtonPressed: (callback) => ipcRenderer.on('lockButtonPressed', callback),

//     handleCanGoBack: (callback) => ipcRenderer.on('canGoBack', callback),
//     handleCanGoForward: (callback) => ipcRenderer.on('canGoForward', callback),

//     handleCanRefresh: (callback) => ipcRenderer.on('canRefresh', callback),

//     handleWindowFocusedOrBlurred: (callback) => {
//         ipcRenderer.on('windowFocused', callback)
//         ipcRenderer.on('windowBlurred', callback)
//     },

//     searchBarQueryEntered: (query) => ipcRenderer.send('searchBarQueryEntered', query),

//     titleBarDoubleClicked: () => ipcRenderer.send('titleBarDoubleClicked'),

//     toggleSettings: () => ipcRenderer.send('toggleSettings'),

//     handleSetTheme: (callback) => ipcRenderer.on('setTheme', callback),

//     handleStartedLoading: (callback) => ipcRenderer.on('startedLoading', callback),

//     handleFinishedLoading: (callback) => ipcRenderer.on('finishedLoading', callback),
// })