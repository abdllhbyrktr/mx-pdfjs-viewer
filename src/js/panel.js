var mxRuntime = window.external.mxGetRuntime(),
  mxBrowser = mxRuntime.create('mx.browser'),
  mxLang = mxRuntime.locale.t,
  mxStorage = mxRuntime.storage,
  OPENED_PDFS = 'OPENED_PDFS',
  openedPdfs = [],
  historyList = null,
  MAX_TITLE_LENGTH = 35,
  pdfUrl = 'mxaddon-pkg://{d0e723de-bdd9-4c64-95c6-c1dc9ce289f1}/window.html';

function shorten(text, maxLength) {
  var ret = text || 'Unknown Document.pdf';
  if (ret.length > maxLength) {
    ret = ret.substr(0, maxLength - 3) + '...';
  }

  return ret;
}

function clearHistory() {
  mxStorage.setConfig(OPENED_PDFS, JSON.stringify([]));
  init([]);
}

function localize() {
  [].slice.call(document.querySelectorAll('[data-lang]')).forEach(function (item) {
    var localizedText = mxLang(item.getAttribute('data-lang')) || item.textContent;
    item.textContent = localizedText;
  });
}

function openPdf(index) {
  var url = pdfUrl + '?pdfLink=' + (index === -1 ? mxBrowser.tabs.getCurrentTab().url : openedPdfs[index].url);

  mxBrowser.tabs.newTab({
    url: url,
    activate: true,
    position: 'afterCurrrent'
  });
}

function init(docs) {
  if (historyList === null) {
    return;
  }

  openedPdfs = docs || JSON.parse(mxStorage.getConfig(OPENED_PDFS) || '[]');
  historyList.innerHTML = '';
  openedPdfs.reverse().forEach(function (h, i) {
    var title = decodeURIComponent(h.url.split('/').pop() || mxLang('app_unknown'));
    historyList.innerHTML += '<li><a href="javascript:;" title="' + title + '" onclick="openPdf(' + i + ')">' + shorten(title, MAX_TITLE_LENGTH) + '</a></li>'
  });
}

document.oncontextmenu = function (e) {
  return false;
};

document.onreadystatechange = function(e) {
  if (document.readyState === 'complete') {
    historyList = document.getElementById('historyList');

    localize();
    init(null);
  }
};

mxRuntime.onAppEvent = function(obj) {
  //console.log(obj.type);
  switch (obj.type) {
    case 'ACTION_START':
      console.info('action is started.');
      break;
    case 'ACTION_STOP':
      console.info('action is stopped.');
      break;
    case 'ACTION_SHOW':
      init(null);
      console.info('action is shown.');
      break;
    case 'ACTION_HIDE':
      console.info('action is hidden.');
      break;
    case 'ERROR':
      console.error(obj.errorMessage);
      break;
    case 'LOCALE_CHANGED':
      console.info('local changed.');
      break;
    default:
      console.log('unknown event type: ' + obj.type);
  }
};
