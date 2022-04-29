"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var onOk = _ref.onOk,
      okText = _ref.okText,
      cancelText = _ref.cancelText,
      title = _ref.title;

  if (confirm(title)) {
    onOk();
  }
};

exports["default"] = _default;