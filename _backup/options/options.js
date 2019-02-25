const backgroundPage = chrome.extension.getBackgroundPage();
const msgTimeout = 1800;
const extensionUUID = chrome.extension.getURL('');

/** Utility Functions **/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $el = document.createElement.bind(document);

function i18nOrdinal(n) {
	const [prefix, suffix] = chrome.i18n.getUILanguage().split('-', 2);
	if (prefix === 'en') {
		if (n === 1) return '1st';
		if (n === 2) return '2nd';
		if (n === 3) return '3rd';
		return `${n}th`;
	}
	return `${n}`;
}

function alertErrorMsg(text) {
	const msg = createErrorMsgElement(text);
	$('#alertMessages').appendChild(msg);
	setTimeout(() => {
		msg.remove();
	}, msgTimeout);
}

function createErrorMsgElement(text) {
	const div = $el('div');
	div.classList.add('alert', 'alert-danger', 'col-sm-12');
	div.setAttribute('role', 'alert');
	div.textContent = text;
	return div;
}

/** View binding **/

document.title = `${chrome.i18n.getMessage('extensionName')} | ${chrome.i18n.getMessage('optionsPageTitle')}`;

$('#navbarTitle').textContent = chrome.i18n.getMessage('extensionName');

/* Save button */
const saveOptions = $('#saveOptions');
//saveOptions.textContent = chrome.i18n.getMessage('saveOptions');
//$('.alert-success').textContent = chrome.i18n.getMessage('msgSuccessSaveOptions');

saveOptions.onclick = () => {
	/* Make sure all input valid */
	const storedSettings = {
		apiKey: $('#apiKey').value,
		apiSecret: $('#apiSecret').value
	};

    browser.storage.sync.set(storedSettings);

    showSuccess();
};

function showSuccess() {
    $('#alertMessages').classList.remove('hidden');
}

function getOptions() {
    browser.storage.sync.get((res) => {
		console.log(res.storageProviders.apiKey)
	});
}

function updateUI(storedSettings) {
    console.log('update ui')
    $('#apiKey').value = storedSettings.apiKey;
    $('#apiSecret').value = storedSettings.apiSecret;
}

/* On opening the options page, fetch stored settings and update the UI with them. */
chrome.storage.sync.get(null, updateUI);
