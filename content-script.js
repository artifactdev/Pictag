
browser.storage.local.get('tags', function (items) {
    createModal(items);
    browser.storage.local.remove('tags');
});

function createModal(tags){
    modalTemplate(tags.tags);
}

function modalTemplate(tags) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function(data) {
        httpRequest.onload = null;

        var template = document.createElement('template');
        template.innerHTML = data.target.responseText;

        deleteModal();
        var element = template.content.firstChild;
        document.body.appendChild(element);
        appendTags(tags);
        addListeners();
    }

    httpRequest.open('GET', browser.extension.getURL('/results.html'));
    httpRequest.send();
}

function deleteModal() {
    if(document.getElementById('hashitmodal') !== null) {
        document.getElementById('hashitmodal').remove();
    }
}

function addListeners() {
    document.getElementById('hashitClose').addEventListener('click', () => {
        deleteModal();
    });

    document.getElementById('hashitCopy').addEventListener('click', () => {
        copyTags();
    })
}

function copyTags() {
    document.getElementById('hashit-tags').select();
    document.execCommand("Copy");
    setTimeout(()=>{
        deleteModal();
    }, 1500)
}

function appendTags(tags) {
    let textarea = document.getElementById('hashit-tags');
    textarea.value = '';

    for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];
        console.log(tag);
        textarea.value = textarea.value + ' ' + tag;
    }

    document.getElementById('hashitmodal').classList.add('show');
}