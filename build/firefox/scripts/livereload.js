(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _ext = require('./utils/ext');

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIVERELOAD_HOST = 'localhost:';
var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error) {
  console.log('reload connection got error:', error);
};

connection.onmessage = function (e) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === 'reload') {
      _ext2.default.runtime.reload();
    }
  }
};

},{"./utils/ext":2}],2:[function(require,module,exports){
'use strict';

var apis = ['alarms', 'bookmarks', 'browserAction', 'commands', 'contextMenus', 'cookies', 'downloads', 'events', 'extension', 'extensionTypes', 'history', 'i18n', 'idle', 'notifications', 'pageAction', 'runtime', 'storage', 'tabs', 'webNavigation', 'webRequest', 'windows'];

function Extension() {
  var _this = this;

  apis.forEach(function (api) {

    _this[api] = null;

    try {
      if (chrome[api]) {
        _this[api] = chrome[api];
      }
    } catch (e) {}

    try {
      if (window[api]) {
        _this[api] = window[api];
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        _this[api] = browser[api];
      }
    } catch (e) {}
    try {
      _this.api = browser.extension[api];
    } catch (e) {}
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {}
}

module.exports = new Extension();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9saXZlcmVsb2FkLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMvZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUE7Ozs7OztBQUVBLElBQUksa0JBQWtCLFlBQXRCO0FBQ0EsSUFBSSxrQkFBa0IsS0FBdEI7QUFDQSxJQUFJLGFBQWEsSUFBSSxTQUFKLENBQWMsVUFBVSxlQUFWLEdBQTRCLGVBQTVCLEdBQThDLGFBQTVELENBQWpCOztBQUVBLFdBQVcsT0FBWCxHQUFxQixVQUFVLEtBQVYsRUFBaUI7QUFDcEMsVUFBUSxHQUFSLENBQVksOEJBQVosRUFBNEMsS0FBNUM7QUFDRCxDQUZEOztBQUlBLFdBQVcsU0FBWCxHQUF1QixVQUFVLENBQVYsRUFBYTtBQUNsQyxNQUFJLEVBQUUsSUFBTixFQUFZO0FBQ1YsUUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFYO0FBQ0EsUUFBSSxRQUFRLEtBQUssT0FBTCxLQUFpQixRQUE3QixFQUF1QztBQUNyQyxvQkFBSSxPQUFKLENBQVksTUFBWjtBQUNEO0FBQ0Y7QUFDRixDQVBEOzs7OztBQ1pBLElBQU0sT0FBTyxDQUNYLFFBRFcsRUFFWCxXQUZXLEVBR1gsZUFIVyxFQUlYLFVBSlcsRUFLWCxjQUxXLEVBTVgsU0FOVyxFQU9YLFdBUFcsRUFRWCxRQVJXLEVBU1gsV0FUVyxFQVVYLGdCQVZXLEVBV1gsU0FYVyxFQVlYLE1BWlcsRUFhWCxNQWJXLEVBY1gsZUFkVyxFQWVYLFlBZlcsRUFnQlgsU0FoQlcsRUFpQlgsU0FqQlcsRUFrQlgsTUFsQlcsRUFtQlgsZUFuQlcsRUFvQlgsWUFwQlcsRUFxQlgsU0FyQlcsQ0FBYjs7QUF3QkEsU0FBUyxTQUFULEdBQXNCO0FBQ3BCLE1BQU0sUUFBUSxJQUFkOztBQUVBLE9BQUssT0FBTCxDQUFhLFVBQVUsR0FBVixFQUFlOztBQUUxQixVQUFNLEdBQU4sSUFBYSxJQUFiOztBQUVBLFFBQUk7QUFDRixVQUFJLE9BQU8sR0FBUCxDQUFKLEVBQWlCO0FBQ2YsY0FBTSxHQUFOLElBQWEsT0FBTyxHQUFQLENBQWI7QUFDRDtBQUNGLEtBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVSxDQUFFOztBQUVkLFFBQUk7QUFDRixVQUFJLE9BQU8sR0FBUCxDQUFKLEVBQWlCO0FBQ2YsY0FBTSxHQUFOLElBQWEsT0FBTyxHQUFQLENBQWI7QUFDRDtBQUNGLEtBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVSxDQUFFOztBQUVkLFFBQUk7QUFDRixVQUFJLFFBQVEsR0FBUixDQUFKLEVBQWtCO0FBQ2hCLGNBQU0sR0FBTixJQUFhLFFBQVEsR0FBUixDQUFiO0FBQ0Q7QUFDRixLQUpELENBSUUsT0FBTyxDQUFQLEVBQVUsQ0FBRTtBQUNkLFFBQUk7QUFDRixZQUFNLEdBQU4sR0FBWSxRQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBWjtBQUNELEtBRkQsQ0FFRSxPQUFPLENBQVAsRUFBVSxDQUFFO0FBQ2YsR0F4QkQ7O0FBMEJBLE1BQUk7QUFDRixRQUFJLFdBQVcsUUFBUSxPQUF2QixFQUFnQztBQUM5QixXQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0Q7QUFDRixHQUpELENBSUUsT0FBTyxDQUFQLEVBQVUsQ0FBRTs7QUFFZCxNQUFJO0FBQ0YsUUFBSSxXQUFXLFFBQVEsYUFBdkIsRUFBc0M7QUFDcEMsV0FBSyxhQUFMLEdBQXFCLFFBQVEsYUFBN0I7QUFDRDtBQUNGLEdBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVSxDQUFFO0FBRWY7O0FBRUQsT0FBTyxPQUFQLEdBQWlCLElBQUksU0FBSixFQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dCBmcm9tIFwiLi91dGlscy9leHRcIjtcblxudmFyIExJVkVSRUxPQURfSE9TVCA9ICdsb2NhbGhvc3Q6JztcbnZhciBMSVZFUkVMT0FEX1BPUlQgPSAzNTcyOTtcbnZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCgnd3M6Ly8nICsgTElWRVJFTE9BRF9IT1NUICsgTElWRVJFTE9BRF9QT1JUICsgJy9saXZlcmVsb2FkJyk7XG5cbmNvbm5lY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICBjb25zb2xlLmxvZygncmVsb2FkIGNvbm5lY3Rpb24gZ290IGVycm9yOicsIGVycm9yKTtcbn07XG5cbmNvbm5lY3Rpb24ub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUuZGF0YSkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgIGlmIChkYXRhICYmIGRhdGEuY29tbWFuZCA9PT0gJ3JlbG9hZCcpIHtcbiAgICAgIGV4dC5ydW50aW1lLnJlbG9hZCgpO1xuICAgIH1cbiAgfVxufTsiLCJjb25zdCBhcGlzID0gW1xuICAnYWxhcm1zJyxcbiAgJ2Jvb2ttYXJrcycsXG4gICdicm93c2VyQWN0aW9uJyxcbiAgJ2NvbW1hbmRzJyxcbiAgJ2NvbnRleHRNZW51cycsXG4gICdjb29raWVzJyxcbiAgJ2Rvd25sb2FkcycsXG4gICdldmVudHMnLFxuICAnZXh0ZW5zaW9uJyxcbiAgJ2V4dGVuc2lvblR5cGVzJyxcbiAgJ2hpc3RvcnknLFxuICAnaTE4bicsXG4gICdpZGxlJyxcbiAgJ25vdGlmaWNhdGlvbnMnLFxuICAncGFnZUFjdGlvbicsXG4gICdydW50aW1lJyxcbiAgJ3N0b3JhZ2UnLFxuICAndGFicycsXG4gICd3ZWJOYXZpZ2F0aW9uJyxcbiAgJ3dlYlJlcXVlc3QnLFxuICAnd2luZG93cycsXG5dXG5cbmZ1bmN0aW9uIEV4dGVuc2lvbiAoKSB7XG4gIGNvbnN0IF90aGlzID0gdGhpc1xuXG4gIGFwaXMuZm9yRWFjaChmdW5jdGlvbiAoYXBpKSB7XG5cbiAgICBfdGhpc1thcGldID0gbnVsbFxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChjaHJvbWVbYXBpXSkge1xuICAgICAgICBfdGhpc1thcGldID0gY2hyb21lW2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3aW5kb3dbYXBpXSkge1xuICAgICAgICBfdGhpc1thcGldID0gd2luZG93W2FwaV1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChicm93c2VyW2FwaV0pIHtcbiAgICAgICAgX3RoaXNbYXBpXSA9IGJyb3dzZXJbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIF90aGlzLmFwaSA9IGJyb3dzZXIuZXh0ZW5zaW9uW2FwaV1cbiAgICB9IGNhdGNoIChlKSB7fVxuICB9KVxuXG4gIHRyeSB7XG4gICAgaWYgKGJyb3dzZXIgJiYgYnJvd3Nlci5ydW50aW1lKSB7XG4gICAgICB0aGlzLnJ1bnRpbWUgPSBicm93c2VyLnJ1bnRpbWVcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLmJyb3dzZXJBY3Rpb24pIHtcbiAgICAgIHRoaXMuYnJvd3NlckFjdGlvbiA9IGJyb3dzZXIuYnJvd3NlckFjdGlvblxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFeHRlbnNpb24oKTsiXX0=
