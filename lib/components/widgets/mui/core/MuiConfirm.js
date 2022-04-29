"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref) {
  var onOk = _ref.onOk,
      okText = _ref.okText,
      cancelText = _ref.cancelText,
      title = _ref.title,
      confirmFn = _ref.confirmFn;
  confirmFn({
    description: title || "Are you sure?",
    title: null,
    confirmationText: okText || "Ok",
    cancellationText: cancelText || "Cancel"
  }).then(onOk)["catch"](function () {});
};

exports["default"] = _default;