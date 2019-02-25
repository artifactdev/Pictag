import ext from "./utils/ext";


// Set up context menu for images, always get whole storage
function createContextMenu() {
	const title =  'Get Hashtags'; //ext.i18n.getMessage('contextMenuTitle')

	ext.contextMenus.create({
        id: 'getHash',
        title,
        contexts: ['image'],
    });
}

/* Default settings. If there is nothing in storage, use these values. */
const defaultSettings = {
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

    var request = require('request')

    var auth = btoa(storedSettings.apiKey + ":" + storedSettings.apiSecret);
    request('https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageURL), {
      method: "GET",
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json'
      }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          buildTagArray(body);
        } else {
          console.log('error', error, response && response.statusCode);
        }
    });



}

function buildTagArray(data) {
    const dataObject = JSON.parse(data);
    const dataTags = dataObject.result.tags;
    let tags = [];

    for (let index = 0; index < dataTags.length; index++) {
        if (index === 30) { break; }
        let tagObject = dataTags[index];

        tags.push('#'+tagObject.tag.en);
    }

    parseTags(tags);
}

function parseTags(tags) {

    browser.storage.local.set({
        tags: tags
    }, function () {
      console.log('TAGS ARE SET')
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

ext.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

/* Setup context menu */
ext.storage.sync.get(null, checkStoredSettings);

/* On click, fetch stored settings and reverse search. */
ext.contextMenus.onClicked.addListener((info, tab) => {
	ext.storage.sync.get(null, getHashtags.bind(null, info));
});
