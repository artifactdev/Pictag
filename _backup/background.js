
// Set up context menu for images, always get whole storage
function createContextMenu() {
	const title =  'Get Hashtags'; //browser.i18n.getMessage('contextMenuTitle')

	browser.contextMenus.create({
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
    const imageURL = info.srcUrl;
    console.log(info)

    // Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
    var request = new XMLHttpRequest();

	// Setup callbacks
	request.onreadystatechange = function () {

		// If the request is complete
		if(request.readyState === 4 && request.status === 200) {
            buildTagArray(request.responseText);
        }

	};

    // Get the HTML
    request.open( 'GET', 'https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageURL) );
    request.setRequestHeader("Authorization", "Basic " + btoa(storedSettings.apiKey + ":" + storedSettings.apiSecret));
	request.send();

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
    console.log(tags)

    browser.storage.local.set({
        tags: tags
    }, function () {
        browser.tabs.executeScript({
            file: "/content-script.js"
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
