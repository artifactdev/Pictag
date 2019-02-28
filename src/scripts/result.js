var storedSettings,
imageURL;

browser.storage.local.get('url', function (url) {
  imageURL = url.url;
  browser.storage.sync.get(null, setStoredsettings);
});


function setStoredsettings(settings) {
  storedSettings = settings;
  setStrings();
  getHashtags(imageURL);
}

var setStrings = function() {
  document.getElementById('analysing').textContent = browser.i18n.getMessage('analysing');
  document.getElementById('hashitCopy').textContent = browser.i18n.getMessage('copytoclipboard');
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

  var requestData = {
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageURL
          }
        }
      }
    ]
  };

  // Get the HTML
  request.open('POST', 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs');
  request.setRequestHeader("Authorization", "Key " + storedSettings.apiKey);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(requestData));
}


function buildTagArray(data) {
  var dataObject = JSON.parse(data);
  var dataTags = dataObject.outputs[0].data.concepts;
  var tags = [];

  for (var index = 0; index < dataTags.length; index++) {
    if (index === parseInt(storedSettings.results)) { break; }
    var tagObject = dataTags[index];
    var beforeTag = '';

    if (storedSettings.addHashtag) {
      beforeTag = '#';
    }

    var tagString = tagObject.name;
    tagString = tagString.replace(/ +/g, "");
    tags.push(beforeTag + tagString);
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
    const seperator = storedSettings.seperator;
    textarea.value = textarea.value + '' + tag + seperator;
  }

  document.getElementById('loader').classList.add('hidden');

  document.getElementById('hashitmodal').classList.add('show');
}