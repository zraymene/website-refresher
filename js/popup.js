var port = chrome.extension.connect({
      name: "SC"
 });

 var currentTabMsg ;


 /*      -----------      RECIVING MESSAGE SAMPLE     ----------------

 port.onMessage.addListener(function(msg) {
      console.log("message recieved" + msg);
 });
*/

/*chrome.tabs.getSelected(null, function(tab) {

  chrome.tabs.executeScript(tab.id, {
    "content.js"
  }, _=>{

    let e = chrome.runtime.lastError;

    if(e !== undefined){

      console.log(tabId, _, e);

    }});


});
*/



$(document).ready(function(){

  $("#start").click(function() {

    chrome.tabs.getSelected(null, function(tab) {
      var checkBox = null;

      if ($('#error_type').is(":checked"))
      {
          checkBox = "on";
      }

      currentTabMsg = {
        TAB : tab,
        ACTION : "START",
        TIME : $('#repeat').val(),
        INTERVAL : $('#interval').val(),
        ERROR_TYPE : checkBox
      };

      port.postMessage(currentTabMsg);

    });

  });

  $("#stop").click(function() {


    currentTabMsg.ACTION = "STOP";

    port.postMessage(currentTabMsg);
  });

  // ############ MAKE SURE ONLY ONE VALUE IS SET , CAN BE DELETED LATER ######################
  $( "#interval" ).change(function() {
    $("#error_type").val("NULL");
  });

  $( "#error_type" ).change(function() {
    $("#interval").val(0);
    $("#repeat").val(0);
  });

});

function ON(){

  chrome.browserAction.setBadgeText({text: 'ON'});

  chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});

}

function OFF() {

  chrome.browserAction.setBadgeText({text: 'IDLE'});

  chrome.browserAction.setBadgeBackgroundColor({color: '#444444'});
}

port.onMessage.addListener(function(msg) {

     switch (msg.TYPE) {
       case "NOTIFY":

         $("#notify").text(msg.MSG);

         break;
       case "ERROR":

          $("#error").text(msg.MSG);

         break;
     }

     switch (msg.STATE) {
       case "WORKING":

         ON();

         break;
       case "IDLE":

          OFF();

         break;
     }
});
