
browser.storage.local.get('url', function (url) {
  appendIframe();
  addListeners();
});

var appendIframe = function() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', browser.extension.getURL('/result.html'));
  iframe.setAttribute('id', 'hashit-frame')

  document.body.appendChild(iframe);
}


var addListeners = function() {
  document.body.addEventListener('click', function(){
    removeIframe()
  });
}

var removeIframe = function() {
  document.getElementById('hashit-frame').remove();
}