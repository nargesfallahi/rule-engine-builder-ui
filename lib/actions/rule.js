"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setValueSrc = exports.setValue = exports.setOperatorOption = exports.setOperator = exports.setField = void 0;

var constants = _interopRequireWildcard(require("../constants"));

var _stuff = require("../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} field
 */
var setField = function setField(config, path, field) {
  return {
    type: constants.SET_FIELD,
    path: (0, _stuff.toImmutableList)(path),
    field: field,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} operator
 */


exports.setField = setField;

var setOperator = function setOperator(config, path, operator) {
  return {
    type: constants.SET_OPERATOR,
    path: (0, _stuff.toImmutableList)(path),
    operator: operator,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} value
 * @param {string} valueType
 * @param {*} asyncListValues
 * @param {boolean} __isInternal
 */


exports.setOperator = setOperator;

var setValue = function setValue(config, path, delta, value, valueType, asyncListValues, __isInternal) {
  return {
    type: constants.SET_VALUE,
    path: (0, _stuff.toImmutableList)(path),
    delta: delta,
    value: value,
    valueType: valueType,
    asyncListValues: asyncListValues,
    config: config,
    __isInternal: __isInternal
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} srcKey
 */


exports.setValue = setValue;

var setValueSrc = function setValueSrc(config, path, delta, srcKey) {
  return {
    type: constants.SET_VALUE_SRC,
    path: (0, _stuff.toImmutableList)(path),
    delta: delta,
    srcKey: srcKey,
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} name
 * @param {*} value
 */


exports.setValueSrc = setValueSrc;

var setOperatorOption = function setOperatorOption(config, path, name, value) {
  return {
    type: constants.SET_OPERATOR_OPTION,
    path: (0, _stuff.toImmutableList)(path),
    name: name,
    value: value,
    config: config
  };
};

exports.setOperatorOption = setOperatorOption;