
browser.storage.local.get('url', function (url) {
  appendIframe();
  addListeners();
});

var appendIframe = function() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', browser.extension.getURL('/result.html'));
  iframe.setAttribute('id', 'hashit-frame');

  document.body.appendChild(iframe);
}


var addListeners = function() {
  document.body.addEventListener('click', function(){
    removeIframe()
  });

  //window.document.getElementById("hashit-frame").contentWindow.document.getElementById("hashitCopy").addEventListener('click', function() {
  //  console.log('copied clicked')
  //  setTimeout(function(){ removeIframe() }, 750);
  //}, false);
}

var removeIframe = function() {
  document.getElementById('hashit-frame').remove();
}