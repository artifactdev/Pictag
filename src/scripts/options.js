import ext from "./utils/ext";

/** Utility Functions **/
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var $el = document.createElement.bind(document);

var saveOptions = $('#saveOptions');

saveOptions.onclick = () => {
	/* Make sure all input valid */
	const storedSettings = {
		apiKey: $('#apiKey').value,
		apiSecret: $('#apiSecret').value
	};

    ext.storage.sync.set(storedSettings);
};

function updateUI(storedSettings) {
  console.log('update ui')
  if (storedSettings) {
    $('#apiKey').value = storedSettings.apiKey;
    $('#apiSecret').value = storedSettings.apiSecret;
  }
}

/* On opening the options page, fetch stored settings and update the UI with them. */
ext.storage.sync.get(null, updateUI);