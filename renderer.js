const searchBar = document.getElementById('searchBar');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const refreshButton = document.getElementById('refreshButton');
const newTabButton = document.getElementById('plusButton');


searchBar.addEventListener('keyup' , (event) => {
  if (event.key === 'Enter') {
    window.api.searchBarQueryEntered(searchBar.value);
    console.log(searchBar.value);
  }
});

backButton.addEventListener('click', (event) => {
  window.api.backButtonPressed();
});

forwardButton.addEventListener('click', (event) => {
  window.api.forwardButtonPressed();
});

refreshButton.addEventListener('click', (event) => {
  window.api.refreshButtonPressed();
});

newTabButton.addEventListener('click', (event) => {
  window.tabs.newTab();
});

window.api.handleSetSearchBarURL((_ev, text) => {
    searchBar.value = text;
    document.activeElement.blur();
});

window.tabs.handleNewTabOpened((event, views) => {
  console.log("inside!!!!");
  console.log(views);
})












