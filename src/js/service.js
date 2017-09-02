var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxStorage = mxRuntime.storage,
  debugMode = false,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html';

function debug(message) {
  if (debugMode) {
    console.log(message);
  }
}

function loadPdf(url, tabId) {
  mxStorage.setConfig('pdf-file', url);
  // close current tab and an open a window.
  var mxTabs = mxRuntime.create('mx.browser.tabs');
  var currentTab = mxTabs.getTabById(tabId);
  mxTabs.newTab({
    url: pdfUrl
  });
  currentTab.close();
}

mxBrowser.onBrowserEvent = function (obj) {
  if (obj.type === 'ON_NAVIGATE') {
    debug(obj.url);
    if (obj.url === pdfUrl) {
      return;
    }

    if (obj.url.indexOf('.pdf') > -1) {
      if (obj.url.indexOf('file:///') === 0) {
        loadPdf(obj.url, obj.id);
      } else {
        fetch(obj.url).then(function (res) {
          var contentType = res.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/pdf') > -1) {
            loadPdf(obj.url, obj.id);
          }
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
  }
};

mxRuntime.onAppEvent = function (obj) {
  if (obj.type === 'M_OPEN') {
    debug(obj);
  }
};
