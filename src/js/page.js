var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxLang = mxRuntime.locale.t,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html';

if (confirm(mxLang('app_confirmation'))) {
  mxBrowser.tabs.newTab({
    url: pdfUrl + '?pdfLink=' + encodeURIComponent(location.href),
    activate: true,
    position: 'afterCurrrent'
  });
}
