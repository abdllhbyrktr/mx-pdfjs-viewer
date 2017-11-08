var mxRuntime = window.external.mxGetRuntime(),
  mxStorage = mxRuntime.storage,
  DEFAULT_URL = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  PDF_FILE = 'pdf-file';

var pdfLink = location.search.split('=').pop();
if (pdfLink && pdfLink.length > 0) {
  DEFAULT_URL = pdfLink;
} else {
  DEFAULT_URL = mxStorage.getConfig(PDF_FILE) || DEFAULT_URL;
}
