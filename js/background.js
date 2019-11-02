var intervalFnc = null;
var currentMsg = null;
var repeatCounter = 0;

function BEGIN_TASK(msg , port) {

  console.log("Starting auto-refresher for TAB:" + msg.TAB.title);

  intervalFnc = setInterval(function(){

    if(currentMsg.TIME == 0 )

      chrome.tabs.reload(msg.TAB.id);

    else if(currentMsg.TIME){

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
