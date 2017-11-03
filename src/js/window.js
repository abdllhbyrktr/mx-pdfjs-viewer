var mxRuntime = window.external.mxGetRuntime(),
  mxStorage = mxRuntime.storage,
  DEFAULT_URL = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  PDF_FILE = 'pdf-file';

DEFAULT_URL = mxStorage.getConfig(PDF_FILE) || DEFAULT_URL;
