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
                  console.log("Starting auto-refresher for TAB:" + msg.TAB.title);
               break;
             case "STOP":
                  console.log("Stoping auto-refresher for TAB:" + msg.TAB.title);
               break;
           }

      });

 })
