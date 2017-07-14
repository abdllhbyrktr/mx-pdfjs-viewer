var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxStorage = mxRuntime.storage,
  debugMode = false;

function debug(message) {
  if (debugMode) {
    console.log(message);
  }
}

function checkFile(url, callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function (ev) {
    if (this.readyState == 4 && this.status == 200) {
      callback(req.getResponseHeader('Content-Type'));
    }
  };
  req.open('GET', url, true);
  req.send();
}

mxBrowser.onBrowserEvent = function (obj) {
  if (obj.type === 'ON_NAVIGATE') {
    debug(obj.url);
    if (obj.url.indexOf('.pdf') > -1) {
      checkFile(obj.url, function(contentType) {
        //console.log(contentType);
        if (contentType.indexOf('application/pdf') > -1) {
          mxStorage.setConfig('pdf-file', obj.url);
          var pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html';
          // close current tab and an open a window.
          var mxTabs = mxRuntime.create('mx.browser.tabs');
          var currentTab = mxTabs.getTabById(obj.id);
          mxTabs.newTab({
            url: pdfUrl
          });
          currentTab.close();
        }
      });
    }
  }
};

mxRuntime.onAppEvent = function (obj) {
  if (obj.type === 'M_OPEN') {
    debug(obj);
  }
};
