// Set up context menu for images, always get whole storage
function createContextMenu() {
	var title =  'Get Hashtags'; //browser.i18n.getMessage('contextMenuTitle')

	browser.contextMenus.create({
        id: 'getHash',
        title,
        contexts: ['image'],
    });
}

/* Default settings. If there is nothing in storage, use these values. */
var defaultSettings = {
	apiKey: '',
	apiSecret: ''
};

/* On startup, check whether we have stored settings and set up the context menu.
  If we don't, then store the default settings. */
function checkStoredSettings(storedSettings) {
    createContextMenu();
}

function getHashtags(info, storedSettings) {
    var imageURL = info.srcUrl;

    browser.storage.local.set({
      url: imageURL
    }, function () {
        browser.tabs.executeScript({
            file: "/scripts/contentscript.js"
        });
    });

}



function onExecuted(result) {
    console.log(`We made it green`);
  }

function onError(error) {
  console.log(`Error: ${error}`);
}



function logURL(requestDetails) {
    console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

/* Setup context menu */
browser.storage.sync.get(null, checkStoredSettings);

/* On click, fetch stored settings and reverse search. */
browser.contextMenus.onClicked.addListener((info, tab) => {
	browser.storage.sync.get(null, getHashtags.bind(null, info));
});
