var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxStorage = mxRuntime.storage,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html',
  PDF_FILE = 'pdf-file',
  IS_PDF_URL = 'is-pdf-url',
  loading = false;

function loadPdf(url) {
  if (loading) {
    return;
  }

  loading = true;
  mxStorage.setConfig(PDF_FILE, url);
  // close current tab and an open a window.
  mxBrowser.tabs.newTab({
    url: pdfUrl
  });

  var currentTab = mxBrowser.tabs.getCurrentTab();
  currentTab.close();
}

function init(url) {
  if (url.indexOf('.pdf') > -1) {
    if (url.indexOf('file:///') === 0) {
      loadPdf(url);
    } else {
      var listenId = Math.random().toString().split('.').pop();
      mxRuntime.listen(listenId, function (obj) {
        loadPdf(url);
      });
      mxRuntime.post(IS_PDF_URL, {
        url: url,
        listenId: listenId
      });
    }
  }
}

var checkUrl = document.location.href;
//console.log(checkUrl);
init(checkUrl);
