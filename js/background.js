var intervalFnc = null;
var currentMsg = null;
var repeatCounter = 0;
var counter = 0;
var tabStatus  ;

chrome.tabs.onUpdated.addListener(function (tabId , info) {

  if(currentMsg != null){
    if(tabId == currentMsg.TAB.id){
        tabStatus = info.status;
    }
  }

});

function BEGIN_TASK(msg , port) {

  console.log("Starting auto-refresher for TAB:" + msg.TAB.title);

  if(currentMsg.ERROR_TYPE != null){

    intervalFnc = setInterval(function(){

      chrome.tabs.executeScript(msg.TAB.id, { file: "js/baitScript.js" }, result => {

        const lastErr = chrome.runtime.lastError;

        if (lastErr ){
          if(tabStatus == "complete"){
            
            counter += 1;

            console.log("Number of repetetion : " + counter );

            chrome.tabs.reload(msg.TAB.id);
          }

         }else {

           counter = 0;

           END_TASK(msg , port);

         }

      });


    }, 500);

  }
  else if(currentMsg.TIME != 0 && currentMsg.INTERVAL == 0){

    intervalFnc = setInterval(function(){

      if(tabStatus == "complete"){

        if(repeatCounter <= 0){

          END_TASK(msg , port);

        }
        else {

          chrome.tabs.reload(msg.TAB.id);

          repeatCounter -= 1;

          tabStatus = "nothing";

        }

      }
    }, 1000);

  }else {

  intervalFnc = setInterval(function(){

    if(currentMsg.TIME == 0 )

      chrome.tabs.reload(msg.TAB.id);

    else {

      if(repeatCounter <= 0){

        END_TASK(msg , port);

      }
      else {

        chrome.tabs.reload(msg.TAB.id);

        repeatCounter -= 1;

        console.log(repeatCounter);

      }
    }

  }, msg.INTERVAL * 1000);

  }


}

function END_TASK(msg , port) {

  console.log("Stoping auto-refresher for TAB:" + msg.TAB.title);

  clearInterval(intervalFnc);

  currentMsg = null;

  port.postMessage({
    TYPE : "NOTIFY",
    MSG  : "Stoping auto-refresher !",
    STATE : "IDLE"
  });
}

chrome.extension.onConnect.addListener(function(port) {

      console.log("Connected .....");

      /* -------------------- SENDING / RECIVING MESSAGE SAMPLE ---------------
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
           port.postMessage("Hi Popup.js");
      });

      */

      port.onMessage.addListener(function(msg) {
        /*   console.log(msg);
           chrome.tabs.reload(msg.TAB.id);      // RELOAD TAB
           setInterval(function(){ chrome.tabs.reload(msg.TAB.id); }, msg.INTERVAL * 1000);
          */
           switch (msg.ACTION) {

             case "START":



          /*   chrome.webNavigation.onErrorOccurred.addListener(function(callback) {
               console.log(callback.error);
             });
             */


                  if(currentMsg == null){

                    repeatCounter = msg.TIME;

                    currentMsg = msg;

                    port.postMessage({
                      TYPE : "NOTIFY",
                      MSG  : "This tab will begin refreshing !",
                      STATE : "WORKING"
                    });

                    BEGIN_TASK(msg , port);


                  }else {
                    port.postMessage({
                      TYPE : "ERROR",
                      MSG  : "The selected tab is already on work Or multi-tab feutere isn't done yet ",
                      STATE : "IDLE"
                    });
                  }
               break;

             case "STOP":

                    END_TASK(msg , port);

               break;

           }

      });

 });
