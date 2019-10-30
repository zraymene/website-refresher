var intervalFnc = null;

function BEGIN_TASK(msg) {

  console.log("Starting auto-refresher for TAB:" + msg.TAB.title);

  intervalFnc = setInterval(function(){

    chrome.tabs.reload(msg.TAB.id);

  }, msg.INTERVAL * 1000);



}

function END_TASK(msg) {

  console.log("Stoping auto-refresher for TAB:" + msg.TAB.title);

  clearInterval(intervalFnc);

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

                  BEGIN_TASK(msg);

               break;

             case "STOP":

                    END_TASK(msg);

               break;

           }

      });

 });
