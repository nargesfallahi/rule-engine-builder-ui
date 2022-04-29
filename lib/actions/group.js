"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNot = exports.setLock = exports.setConjunction = void 0;

var constants = _interopRequireWildcard(require("../constants"));

var _stuff = require("../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} conjunction
 */
var setConjunction = function setConjunction(config, path, conjunction) {
  return {
    type: constants.SET_CONJUNCTION,
    path: (0, _stuff.toImmutableList)(path),
    conjunction: conjunction
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {bool} not
 */


exports.setConjunction = setConjunction;

var setNot = function setNot(config, path, not) {
  return {
    type: constants.SET_NOT,
    path: (0, _stuff.toImmutableList)(path),
    not: not
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {bool} lock
 */


exports.setNot = setNot;

var setLock = function setLock(config, path, lock) {
  return {
    type: constants.SET_LOCK,
    path: (0, _stuff.toImmutableList)(path),
    lock: lock
  };
};

exports.setLock = setLock;