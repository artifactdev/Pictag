var storedSettings,
imageURL;

browser.storage.local.get('url', function (url) {
  imageURL = url.url;
  browser.storage.sync.get(null, setStoredsettings);
});


function setStoredsettings(settings) {
  storedSettings = settings;
  window.parent.postMessage("Hello From IFrame", "*");
  getHashtags(imageURL);
}

var getHashtags = function (imageURL) {
  if (!window.XMLHttpRequest) return;

  // Create new request
  var request = new XMLHttpRequest();

  // Setup callbacks
  request.onreadystatechange = function () {

    // If the request is compvare
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText)
      buildTagArray(request.responseText);
      addListeners();
    }

  };

  // Get the HTML
  request.open('GET', 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageURL));
  request.setRequestHeader("Authorization", "Basic " + btoa(storedSettings.apiKey + ":" + storedSettings.apiSecret));
  request.send();
}


function buildTagArray(data) {
  var dataObject = JSON.parse(data);
  var dataTags = dataObject.result.tags;
  var tags = [];

  for (var index = 0; index < dataTags.length; index++) {
    if (index === parseInt(storedSettings.results)) { break; }
    var tagObject = dataTags[index];
    var beforeTag = '';

    if (storedSettings.addHashtag) {
      beforeTag = '#';
    }

    tags.push(beforeTag + tagObject.tag.en);
  }

  parseTags(tags);
}

function parseTags(tags) {
  appendTags(tags);
}

var addListeners = function () {
  document.getElementById('hashitCopy').addEventListener('click', () => {
    copyTags();
  })
}

var copyTags = function () {
  document.getElementById('hashit-tags').select();
  document.execCommand("Copy");
  window.parent.postMessage("Hello From IFrame", "*");
}

var appendTags = function (tags) {
  let textarea = document.getElementById('hashit-tags');
  textarea.value = '';

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    console.log(tag);
    textarea.value = textarea.value + ' ' + tag;
  }

  document.getElementById('loader').classList.add('hidden');

  document.getElementById('hashitmodal').classList.add('show');
}