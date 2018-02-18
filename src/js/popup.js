var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxLang = mxRuntime.locale.t,
  mxStorage = mxRuntime.storage,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html',
  PDF_FILE = 'pdf-file',
  IS_PDF_URL = 'is-pdf-url',
  loading = false;

function findTab() {
  for (var i = 0; i < mxBrowser.tabs.length; i++) {
    var tab = mxBrowser.tabs.getTab(i);
    if (tab.url === location.href) {
      return tab;
    }
  }

  return null;
}

function loadPdf(url) {
  if (loading) {
    return;
  }

  loading = true;
  mxStorage.setConfig(PDF_FILE, url);
  var currentTab = findTab();
  currentTab.navigate(pdfUrl + '?pdfLink=' + location.href);
}

function insertLoadingBar() {
  // insert style.
  var cssText = `
@-webkit-keyframes progressIndeterminate {
  0% { left: -142px; }
  100% { left: 0; }
}

@keyframes progressIndeterminate {
  0% { left: -142px; }
  100% { left: 0; }
}

#loadingBar {
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #333;
  border-bottom: 1px solid #333;
}

#loadingBar .waiting {
  z-index: 9999999999;
  background-color: transparent;
  text-align: center;
  position: fixed;
  left: 40%;
  top: 4px;
  font-size: 20px;
  font-style: normal;
}

#loadingBar .progress.indeterminate {
  background-color: #999;
  -webkit-transition: none;
  transition: none;
}

#loadingBar .progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #ddd;
  overflow: hidden;
  -webkit-transition: width 200ms;
  transition: width 200ms;
}

#loadingBar .progress.indeterminate .glimmer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(100% + 150px);
  background: repeating-linear-gradient(135deg, #bbb 0, #999 5px, #999 45px, #ddd 55px, #ddd 95px, #bbb 100px);
  -webkit-animation: progressIndeterminate 950ms linear infinite;
  animation: progressIndeterminate 950ms linear infinite;
}`;

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssText;
  document.body.insertBefore(style, document.body.firstChild);

  // insert elements.
  var loadingBar = document.createElement('div');
  loadingBar.id = 'loadingBar';
  loadingBar.innerHTML = '<div class="waiting">' + (mxLang('app_plesaewait') || 'Opening in Pdf.js Viewer') + '</div><div class="progress indeterminate" style="height: 100%; width: 100%;"><div class="glimmer"></div></div>';
  document.body.insertBefore(loadingBar, document.body.firstChild);
}

function init(url) {
  if (url.indexOf('.pdf') > -1) {
    if (url.indexOf('file:///') === 0) {
      loadPdf(url);
    } else {
      var listenId = Math.random()
        .toString()
        .split('.')
        .pop();
      mxRuntime.listen(listenId, function(obj) {
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

document.onreadystatechange = function(e) {
  if (document.readyState === 'complete') {
    if (checkUrl.indexOf('.pdf') > -1 && document.body.children.length === 1 && document.body.children[0].tagName === 'EMBED') {
      insertLoadingBar();
    }
  }
};
