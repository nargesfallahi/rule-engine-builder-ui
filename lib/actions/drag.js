"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDragStart = exports.setDragProgress = exports.setDragEnd = void 0;

var constants = _interopRequireWildcard(require("../constants"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {Object} mousePos
 * @param {Object} dragging
 */
var setDragProgress = function setDragProgress(mousePos, dragging) {
  return {
    type: constants.SET_DRAG_PROGRESS,
    mousePos: mousePos,
    dragging: dragging
  };
};
/**
 * @param {Object} dragStart
 * @param {Object} dragging
 * @param {Object} mousePos
 */


exports.setDragProgress = setDragProgress;

var setDragStart = function setDragStart(dragStart, dragging, mousePos) {
  return {
    type: constants.SET_DRAG_START,
    dragStart: dragStart,
    dragging: dragging,
    mousePos: mousePos
  };
};
/**
 *
 */


exports.setDragStart = setDragStart;

var setDragEnd = function setDragEnd() {
  return {
    type: constants.SET_DRAG_END
  };
};

exports.setDragEnd = setDragEnd;