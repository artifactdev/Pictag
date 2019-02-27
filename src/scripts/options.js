/** Utility Functions **/
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var $el = document.createElement.bind(document);

var saveOptions = $('#saveOptions');

saveOptions.onclick = () => {
  /* Make sure all input valid */
	const storedSettings = {
		apiKey: $('#apiKey').value,
    results: $('#resultAmount').value,
    addHashtag: $('#addHash').checked,
    seperator: $('#seperator').value
	};

    browser.storage.sync.set(storedSettings);
};

function updateUI(storedSettings) {
  console.log('update ui')
  if (storedSettings) {
    $('#apiKey').value = storedSettings.apiKey;
    if (!storedSettings.results) {
      $('#resultAmount').value = 30;
    } else {
      $('#resultAmount').value = storedSettings.results;
    }
    if (!storedSettings.addHashtag) {
      $('#addHash').checked = true;
    } else {
      $('#addHash').checked = storedSettings.addHashtag;
    }
    if (!storedSettings.seperator) {
      $('#seperator').value = ' ';
    } else {
      $('#seperator').value = storedSettings.seperator;
    }
  } else {
    $('#resultAmount').value = 30;
  }
}

/* On opening the options page, fetch stored settings and update the UI with them. */
browser.storage.sync.get(null, updateUI);