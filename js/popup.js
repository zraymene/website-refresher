var port = chrome.extension.connect({
      name: "SC"
 });


 /*      -----------      RECIVING MESSAGE SAMPLE     ----------------

 port.onMessage.addListener(function(msg) {
      console.log("message recieved" + msg);
 });
*/

$(document).ready(function(){

  $("#start").click(function() {

    chrome.browserAction.setBadgeText({text: 'ON'});

    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});

    chrome.tabs.getSelected(null, function(tab) {

      $("#test").html(tab.id);

      port.postMessage({
        TAB : tab,
        ACTION : "START",
        INTERVAL : 1,
        ERROR_TYPE : 0
      });

    });

  });

  $("#stop").click(function() {

    chrome.browserAction.setBadgeText({text: 'IDLE'});

    chrome.browserAction.setBadgeBackgroundColor({color: '#444444'});

  });



});
