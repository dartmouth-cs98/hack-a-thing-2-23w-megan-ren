var ById = function (id) {
  return document.getElementById(id);
}
var jsonfile = require('jsonfile');
var favicon = require('favicon-getter').default;
var path = require('path');
var uuid = require('uuid');
var bookmarks = path.join(__dirname, 'bookmarks.json');

var back = ById('back'),
  forward = ById('forward'),
  refresh = ById('refresh'),
  omni = ById('url')

window.onload = function() {
    let list = document.getElementById("list");
    let newTask = document.getElementById("newTask");

    document.getElementById("addTask").addEventListener('click', () => {
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`);
        ipcRenderer.invoke('show-notification', newTask.value);
        newTask.value = '';
    });
}