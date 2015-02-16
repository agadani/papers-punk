// This code is from Jorge Cardoso's blog at http://jorgecardoso.eu/htmlblog/2012-08-30-Listing%20a%20user%20directory%20with%20javascript%20in%20a%20Chrome%20extension.html
console.log("Directory Lister tab script loaded");

var links = document.getElementsByClassName("icon file");

var files = [];
for (var i = 0; i < links.length; i++) {
    filename = links[i].href.substring(links[i].href.lastIndexOf("/")+1, links[i].href.length);
    if ( !(filename.indexOf(".") == 0) ) { // skip system files
        files.push(links[i].href);
    }
}

chrome.extension.sendMessage(files);
