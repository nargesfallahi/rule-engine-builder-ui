"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTree = exports.removeRule = exports.removeGroup = exports.moveItem = exports.addRule = exports.addGroup = exports.addDefaultCaseGroup = exports.addCaseGroup = void 0;

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _stuff = require("../utils/stuff");

var _defaultUtils = require("../utils/defaultUtils");

var constants = _interopRequireWildcard(require("../constants"));

var _immutable = _interopRequireDefault(require("immutable"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {object} config
 * @param {Immutable.Map} tree
 */
var setTree = function setTree(config, tree) {
  return {
    type: constants.SET_TREE,
    tree: tree
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.setTree = setTree;

var addRule = function addRule(config, path, properties) {
  var ruleType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "rule";
  var children = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  return {
    type: constants.ADD_RULE,
    ruleType: ruleType,
    children: children,
    path: (0, _stuff.toImmutableList)(path),
    id: (0, _uuid["default"])(),
    properties: (0, _defaultUtils.defaultRuleProperties)(config).merge(properties || {}),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


exports.addRule = addRule;

var removeRule = function removeRule(config, path) {
  return {
    type: constants.REMOVE_RULE,
    path: (0, _stuff.toImmutableList)(path),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.removeRule = removeRule;

var addDefaultCaseGroup = function addDefaultCaseGroup(config, path, properties) {
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    type: constants.ADD_CASE_GROUP,
    path: (0, _stuff.toImmutableList)(path),
    children: children,
    id: (0, _uuid["default"])(),
    properties: (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}),
    config: config,
    meta: {
      isDefaultCase: true
    }
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.addDefaultCaseGroup = addDefaultCaseGroup;

var addCaseGroup = function addCaseGroup(config, path, properties) {
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    type: constants.ADD_CASE_GROUP,
    path: (0, _stuff.toImmutableList)(path),
    children: children,
    id: (0, _uuid["default"])(),
    properties: (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


exports.addCaseGroup = addCaseGroup;

var addGroup = function addGroup(config, path, properties) {
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    type: constants.ADD_GROUP,
    path: (0, _stuff.toImmutableList)(path),
    children: children,
    id: (0, _uuid["default"])(),
    properties: (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


exports.addGroup = addGroup;

var removeGroup = function removeGroup(config, path) {
  return {
    type: constants.REMOVE_GROUP,
    path: (0, _stuff.toImmutableList)(path),
    config: config
  };
};
/**
 * @param {object} config
 * @param {Array} fromPath
 * @param {Array} toPath
 * @param {String} placement, see constants PLACEMENT_*
 */


exports.removeGroup = removeGroup;

var moveItem = function moveItem(config, fromPath, toPath, placement) {
  return {
    type: constants.MOVE_ITEM,
    fromPath: (0, _stuff.toImmutableList)(fromPath),
    toPath: (0, _stuff.toImmutableList)(toPath),
    placement: placement,
    config: config
  };
};

exports.moveItem = moveItem;