var port = chrome.extension.connect({
      name: "SC"
 });

 var currentTabMsg ;


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

      currentTabMsg = {
        TAB : tab,
        ACTION : "START",
        INTERVAL : $('#interval').val(),
        ERROR_TYPE : $('#error_type').val()
      };

      port.postMessage(currentTabMsg);

    });

  });

  $("#stop").click(function() {

    chrome.browserAction.setBadgeText({text: 'IDLE'});

    chrome.browserAction.setBadgeBackgroundColor({color: '#444444'});

    currentTabMsg.ACTION = "STOP";

    port.postMessage(currentTabMsg);
  });

  // ############ MAKE SURE ONLY ONE VALUE IS SET , CAN BE DELETED LATER ######################
  $( "#interval" ).change(function() {
    $("#error_type").val("NULL");
  });

  $( "#error_type" ).change(function() {
    $("#interval").val(0);
  });

});
