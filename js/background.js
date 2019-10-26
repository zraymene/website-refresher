var current;
chrome.runtime.onStartup.addListener(function() {
  chrome.extension.onConnect.addListener(function(port) {
      port.postMessage("START");
      console.log('test');
    });
});
