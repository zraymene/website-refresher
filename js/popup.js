$(document).ready(function(){

  var current ;

  chrome.tabs.onActivated.addListener(function(tab) {
    current = tab;
  });

  var port = chrome.runtime.connect();

   port.onMessage.addListener(function(msg) {
        switch (msg) {
          case "START":
            chrome.browserAction.setBadgeText({text: 'START'});
            chrome.browserAction.setBadgeBackgroundColor({color: '#444444'});
            console.log("Started");
            break;

        }
   });

  $("#start").click(function() {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});

    port.postMessage(tab);
  });

  $("#stop").click(function() {
    chrome.browserAction.setBadgeText({text: 'IDLE'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#444444'});
  });



});
