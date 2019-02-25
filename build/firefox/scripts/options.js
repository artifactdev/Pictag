(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _ext = require('./utils/ext');

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Utility Functions **/
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var $el = document.createElement.bind(document);

var saveOptions = $('#saveOptions');

saveOptions.onclick = function () {
  /* Make sure all input valid */
  var storedSettings = {
    apiKey: $('#apiKey').value,
    apiSecret: $('#apiSecret').value
  };

  _ext2.default.storage.sync.set(storedSettings);
};

function updateUI(storedSettings) {
  console.log('update ui');
  if (storedSettings) {
    $('#apiKey').value = storedSettings.apiKey;
    $('#apiSecret').value = storedSettings.apiSecret;
  }
}

/* On opening the options page, fetch stored settings and update the UI with them. */
_ext2.default.storage.sync.get(null, updateUI);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9vcHRpb25zLmpzIiwic3JjL3NjcmlwdHMvdXRpbHMvZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUE7QUFDQSxJQUFJLElBQUksU0FBUyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVI7QUFDQSxJQUFJLEtBQUssU0FBUyxnQkFBVCxDQUEwQixJQUExQixDQUErQixRQUEvQixDQUFUO0FBQ0EsSUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWOztBQUVBLElBQUksY0FBYyxFQUFFLGNBQUYsQ0FBbEI7O0FBRUEsWUFBWSxPQUFaLEdBQXNCLFlBQU07QUFDM0I7QUFDQSxNQUFNLGlCQUFpQjtBQUN0QixZQUFRLEVBQUUsU0FBRixFQUFhLEtBREM7QUFFdEIsZUFBVyxFQUFFLFlBQUYsRUFBZ0I7QUFGTCxHQUF2Qjs7QUFLRyxnQkFBSSxPQUFKLENBQVksSUFBWixDQUFpQixHQUFqQixDQUFxQixjQUFyQjtBQUNILENBUkQ7O0FBVUEsU0FBUyxRQUFULENBQWtCLGNBQWxCLEVBQWtDO0FBQ2hDLFVBQVEsR0FBUixDQUFZLFdBQVo7QUFDQSxNQUFJLGNBQUosRUFBb0I7QUFDbEIsTUFBRSxTQUFGLEVBQWEsS0FBYixHQUFxQixlQUFlLE1BQXBDO0FBQ0EsTUFBRSxZQUFGLEVBQWdCLEtBQWhCLEdBQXdCLGVBQWUsU0FBdkM7QUFDRDtBQUNGOztBQUVEO0FBQ0EsY0FBSSxPQUFKLENBQVksSUFBWixDQUFpQixHQUFqQixDQUFxQixJQUFyQixFQUEyQixRQUEzQjs7Ozs7QUM1QkEsSUFBTSxPQUFPLENBQ1gsUUFEVyxFQUVYLFdBRlcsRUFHWCxlQUhXLEVBSVgsVUFKVyxFQUtYLGNBTFcsRUFNWCxTQU5XLEVBT1gsV0FQVyxFQVFYLFFBUlcsRUFTWCxXQVRXLEVBVVgsZ0JBVlcsRUFXWCxTQVhXLEVBWVgsTUFaVyxFQWFYLE1BYlcsRUFjWCxlQWRXLEVBZVgsWUFmVyxFQWdCWCxTQWhCVyxFQWlCWCxTQWpCVyxFQWtCWCxNQWxCVyxFQW1CWCxlQW5CVyxFQW9CWCxZQXBCVyxFQXFCWCxTQXJCVyxDQUFiOztBQXdCQSxTQUFTLFNBQVQsR0FBc0I7QUFDcEIsTUFBTSxRQUFRLElBQWQ7O0FBRUEsT0FBSyxPQUFMLENBQWEsVUFBVSxHQUFWLEVBQWU7O0FBRTFCLFVBQU0sR0FBTixJQUFhLElBQWI7O0FBRUEsUUFBSTtBQUNGLFVBQUksT0FBTyxHQUFQLENBQUosRUFBaUI7QUFDZixjQUFNLEdBQU4sSUFBYSxPQUFPLEdBQVAsQ0FBYjtBQUNEO0FBQ0YsS0FKRCxDQUlFLE9BQU8sQ0FBUCxFQUFVLENBQUU7O0FBRWQsUUFBSTtBQUNGLFVBQUksT0FBTyxHQUFQLENBQUosRUFBaUI7QUFDZixjQUFNLEdBQU4sSUFBYSxPQUFPLEdBQVAsQ0FBYjtBQUNEO0FBQ0YsS0FKRCxDQUlFLE9BQU8sQ0FBUCxFQUFVLENBQUU7O0FBRWQsUUFBSTtBQUNGLFVBQUksUUFBUSxHQUFSLENBQUosRUFBa0I7QUFDaEIsY0FBTSxHQUFOLElBQWEsUUFBUSxHQUFSLENBQWI7QUFDRDtBQUNGLEtBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVSxDQUFFO0FBQ2QsUUFBSTtBQUNGLFlBQU0sR0FBTixHQUFZLFFBQVEsU0FBUixDQUFrQixHQUFsQixDQUFaO0FBQ0QsS0FGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVLENBQUU7QUFDZixHQXhCRDs7QUEwQkEsTUFBSTtBQUNGLFFBQUksV0FBVyxRQUFRLE9BQXZCLEVBQWdDO0FBQzlCLFdBQUssT0FBTCxHQUFlLFFBQVEsT0FBdkI7QUFDRDtBQUNGLEdBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVSxDQUFFOztBQUVkLE1BQUk7QUFDRixRQUFJLFdBQVcsUUFBUSxhQUF2QixFQUFzQztBQUNwQyxXQUFLLGFBQUwsR0FBcUIsUUFBUSxhQUE3QjtBQUNEO0FBQ0YsR0FKRCxDQUlFLE9BQU8sQ0FBUCxFQUFVLENBQUU7QUFFZjs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsSUFBSSxTQUFKLEVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGV4dCBmcm9tIFwiLi91dGlscy9leHRcIjtcblxuLyoqIFV0aWxpdHkgRnVuY3Rpb25zICoqL1xudmFyICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xudmFyICQkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KTtcbnZhciAkZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpO1xuXG52YXIgc2F2ZU9wdGlvbnMgPSAkKCcjc2F2ZU9wdGlvbnMnKTtcblxuc2F2ZU9wdGlvbnMub25jbGljayA9ICgpID0+IHtcblx0LyogTWFrZSBzdXJlIGFsbCBpbnB1dCB2YWxpZCAqL1xuXHRjb25zdCBzdG9yZWRTZXR0aW5ncyA9IHtcblx0XHRhcGlLZXk6ICQoJyNhcGlLZXknKS52YWx1ZSxcblx0XHRhcGlTZWNyZXQ6ICQoJyNhcGlTZWNyZXQnKS52YWx1ZVxuXHR9O1xuXG4gICAgZXh0LnN0b3JhZ2Uuc3luYy5zZXQoc3RvcmVkU2V0dGluZ3MpO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlVUkoc3RvcmVkU2V0dGluZ3MpIHtcbiAgY29uc29sZS5sb2coJ3VwZGF0ZSB1aScpXG4gIGlmIChzdG9yZWRTZXR0aW5ncykge1xuICAgICQoJyNhcGlLZXknKS52YWx1ZSA9IHN0b3JlZFNldHRpbmdzLmFwaUtleTtcbiAgICAkKCcjYXBpU2VjcmV0JykudmFsdWUgPSBzdG9yZWRTZXR0aW5ncy5hcGlTZWNyZXQ7XG4gIH1cbn1cblxuLyogT24gb3BlbmluZyB0aGUgb3B0aW9ucyBwYWdlLCBmZXRjaCBzdG9yZWQgc2V0dGluZ3MgYW5kIHVwZGF0ZSB0aGUgVUkgd2l0aCB0aGVtLiAqL1xuZXh0LnN0b3JhZ2Uuc3luYy5nZXQobnVsbCwgdXBkYXRlVUkpOyIsImNvbnN0IGFwaXMgPSBbXG4gICdhbGFybXMnLFxuICAnYm9va21hcmtzJyxcbiAgJ2Jyb3dzZXJBY3Rpb24nLFxuICAnY29tbWFuZHMnLFxuICAnY29udGV4dE1lbnVzJyxcbiAgJ2Nvb2tpZXMnLFxuICAnZG93bmxvYWRzJyxcbiAgJ2V2ZW50cycsXG4gICdleHRlbnNpb24nLFxuICAnZXh0ZW5zaW9uVHlwZXMnLFxuICAnaGlzdG9yeScsXG4gICdpMThuJyxcbiAgJ2lkbGUnLFxuICAnbm90aWZpY2F0aW9ucycsXG4gICdwYWdlQWN0aW9uJyxcbiAgJ3J1bnRpbWUnLFxuICAnc3RvcmFnZScsXG4gICd0YWJzJyxcbiAgJ3dlYk5hdmlnYXRpb24nLFxuICAnd2ViUmVxdWVzdCcsXG4gICd3aW5kb3dzJyxcbl1cblxuZnVuY3Rpb24gRXh0ZW5zaW9uICgpIHtcbiAgY29uc3QgX3RoaXMgPSB0aGlzXG5cbiAgYXBpcy5mb3JFYWNoKGZ1bmN0aW9uIChhcGkpIHtcblxuICAgIF90aGlzW2FwaV0gPSBudWxsXG5cbiAgICB0cnkge1xuICAgICAgaWYgKGNocm9tZVthcGldKSB7XG4gICAgICAgIF90aGlzW2FwaV0gPSBjaHJvbWVbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHdpbmRvd1thcGldKSB7XG4gICAgICAgIF90aGlzW2FwaV0gPSB3aW5kb3dbYXBpXVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGJyb3dzZXJbYXBpXSkge1xuICAgICAgICBfdGhpc1thcGldID0gYnJvd3NlclthcGldXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgX3RoaXMuYXBpID0gYnJvd3Nlci5leHRlbnNpb25bYXBpXVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0pXG5cbiAgdHJ5IHtcbiAgICBpZiAoYnJvd3NlciAmJiBicm93c2VyLnJ1bnRpbWUpIHtcbiAgICAgIHRoaXMucnVudGltZSA9IGJyb3dzZXIucnVudGltZVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB0cnkge1xuICAgIGlmIChicm93c2VyICYmIGJyb3dzZXIuYnJvd3NlckFjdGlvbikge1xuICAgICAgdGhpcy5icm93c2VyQWN0aW9uID0gYnJvd3Nlci5icm93c2VyQWN0aW9uXG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEV4dGVuc2lvbigpOyJdfQ==
