
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

  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];

  // Now...
  // if
  //    "attachEvent", then we need to select "onmessage" as the event.
  // if
  //    "addEventListener", then we need to select "message" as the event

  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child IFrame window
  eventer(messageEvent, function (e) {
        alert(e.data);
        console.log(e.data)
        // Do whatever you want to do with the data got from IFrame in Parent form.
  }, false);
}

var removeIframe = function() {
  document.getElementById('hashit-frame').remove();
}