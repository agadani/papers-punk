// Copyright: See LICENSE. (BSD, simplified 2-clause)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function init() {
  chrome.storage.sync.get({ papersDir: '' }, function(items) {
      if(items.papersDir != '') { 
         pickAFile(items.papersDir);
      } else {
        // Complain that the directory isn't set yet
        document.getElementById('error-not-set').style['display'] = '';
        document.getElementById('optionslink').href =
          chrome.extension.getURL("options.html");
      }
    });
}

function pickAFile(papersDir) {
  d = new DirectoryList(papersDir);
  d.getFileList(function(request) {
     var files = request;
     if (!files || files.length == 0) { return; }
     var i = getRandomInt(0, files.length);
     window.location = files[i];
  });

  // FUTURE TODO: Figure out how to specify options for this extension and set a default paper directory instead of hardcoding it.
  // FUTURE TODO: Weight the random by file age.
  // FUTURE TODO: Make it work without turning on the built-in pdf reader
  // FUTURE TODO: Mark as read button.
}

if (window.location.href.match(/chrome-extension:.*newtab.html/)) {
  document.addEventListener("DOMContentLoaded", init);
}
