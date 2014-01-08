if (window._) {
  if (window.when) {
    window._.when = window.when;
  }
  if (window.reqwest) {
    window._.ajax = window.reqwest;
  }
}