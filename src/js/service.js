var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxStorage = mxRuntime.storage,
  debugMode = false;

function debug(message) {
  if (debugMode) {
    console.log(message);
  }
}

mxBrowser.onBrowserEvent = function (obj) {
  if (obj.type === 'ON_NAVIGATE') {
    debug(obj.url);
    var urlExt = obj.url.split('.').pop();
    if (urlExt === 'pdf') {
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
  }
}

mxRuntime.onAppEvent = function (obj) {
  if (obj.type === 'M_OPEN') {
    debug(obj);
  }
}