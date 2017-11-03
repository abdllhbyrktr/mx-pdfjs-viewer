var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxStorage = mxRuntime.storage,
  debugMode = false,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html',
  IS_PDF_URL = 'is-pdf-url';

function debug(message) {
  if (debugMode) {
    console.log(message);
  }
}

mxRuntime.listen(IS_PDF_URL, function (obj) {
  fetch(obj.url).then(function (res) {
    var contentType = res.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/pdf') > -1) {
      mxRuntime.post(obj.listenId, {
        isPdfUrl: true
      });
    }
  }).catch(function (err) {
    console.error(err);
  });
});
