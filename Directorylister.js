// This code is from Jorge Cardoso's blog at http://jorgecardoso.eu/htmlblog/2012-08-30-Listing%20a%20user%20directory%20with%20javascript%20in%20a%20Chrome%20extension.html

function DirectoryList ( path ) {
  this.path = path;
  this.fileList = [];
}

DirectoryList.prototype.getFileList = function( fileListener ) {
  var $this = this;
  chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
    chrome.extension.onMessage.removeListener(arguments.callee);
    chrome.tabs.remove($this.directory_list_tab);
    $this.fileList = request;
    fileListener(request);
  });


  chrome.tabs.onUpdated.addListener(function onTabUpdated(tabId, changeInfo, _tab) {
    if ( _tab.id == $this.directory_list_tab ) {
      chrome.tabs.executeScript(_tab.id, {file: "directorylister-tab.js"});
      chrome.tabs.onUpdated.removeListener(arguments.callee);
    } 
  });

  chrome.tabs.create({url:"file://"+$this.path, selected:false}, function(_tab) {
    $this.directory_list_tab = _tab.id;
  });
};
