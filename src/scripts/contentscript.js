
browser.storage.local.get('tags', function (items) {
  console.log('TAGS:', items)
  createModal(items)
  browser.storage.local.remove('tags');
});

var createModal = function(tags){
  console.log('create modal passed')
  modalTemplate(tags.tags);
}

var modalTemplate = function(tags) {
  console.log('modal template entered')
  var templateURL = browser.extension.getURL('/result.html');
  var templateRequest = new XMLHttpRequest();
  templateRequest.open("GET", templateURL, false);
  templateRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var template = document.createElement('template');
        template.innerHTML = this.responseText;
        console.log(this.respponseText)
        deleteModal();
        var element = template.content.firstChild;
        console.log(element);
        document.body.appendChild(element);
        appendTags(tags);
        addListeners();
      } else if (this.readySate == 4 && this.status !== 200) {
        console.log("Error", templateRequest.statusText);
      }
  };
  templateRequest.send();

}

var appendIframe = function() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', browser.extension.getURL('/result.html'));
  iframe.setAttribute('width', '500px');
  iframe.setAttribute('height', '500px');
  iframe.setAttribute('id', 'hashitmodal')
  iframe.classList.add('show')

  document.body.appendChild(iframe);
}


var deleteModal = function() {
  if(document.getElementById('hashitmodal') !== null) {
      document.getElementById('hashitmodal').remove();
  }
}

var addListeners = function() {
  document.getElementById('hashitClose').addEventListener('click', () => {
      deleteModal();
  });

  document.getElementById('hashitCopy').addEventListener('click', () => {
      copyTags();
  })
}

var copyTags = function() {
  document.getElementById('hashit-tags').select();
  document.execCommand("Copy");
  setTimeout(()=>{
      deleteModal();
  }, 1500)
}

var appendTags = function(tags) {
  let textarea = document.getElementById('hashit-tags');
  textarea.value = '';

  for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];
      console.log(tag);
      textarea.value = textarea.value + ' ' + tag;
  }

  document.getElementById('hashitmodal').classList.add('show');
}