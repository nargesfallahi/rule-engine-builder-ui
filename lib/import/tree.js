"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImmutableTree = exports.getTree = exports.checkTree = void 0;
Object.defineProperty(exports, "isJsonLogic", {
  enumerable: true,
  get: function get() {
    return _stuff.isJsonLogic;
  }
});
exports.loadTree = exports.isValidTree = exports.isTree = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _immutable = _interopRequireWildcard(require("immutable"));

var _validation = require("../utils/validation");

var _configUtils = require("../utils/configUtils");

var _treeUtils = require("../utils/treeUtils");

var _stuff = require("../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getTree = function getTree(immutableTree) {
  var light = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var children1AsArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!immutableTree) return undefined;
  var tree = immutableTree;
  tree = tree.toJS();
  if (light) tree = (0, _treeUtils.getLightTree)(tree, children1AsArray);
  return tree;
};

exports.getTree = getTree;

var loadTree = function loadTree(serTree) {
  if (isImmutableTree(serTree)) {
    return serTree;
  } else if (isTree(serTree)) {
    return jsTreeToImmutable(serTree);
  } else if (typeof serTree == "string" && serTree.startsWith('["~#iM"')) {
    //tip: old versions of RAQB were saving tree with `transit.toJSON()`
    // https://github.com/ukrbublik/react-awesome-query-builder/issues/69
    throw "You are trying to load query in obsolete serialization format (Immutable string) which is not supported in versions starting from 2.1.17";
  } else if (typeof serTree == "string") {
    return jsTreeToImmutable(JSON.parse(serTree));
  } else throw "Can't load tree!";
};

exports.loadTree = loadTree;

var checkTree = function checkTree(tree, config) {
  if (!tree) return undefined;
  var extendedConfig = (0, _configUtils.extendConfig)(config);
  return (0, _validation.validateTree)(tree, null, extendedConfig, extendedConfig);
};

exports.checkTree = checkTree;

var isValidTree = function isValidTree(tree) {
  return (0, _treeUtils.getTreeBadFields)(tree).length == 0;
};

exports.isValidTree = isValidTree;

var isImmutableTree = function isImmutableTree(tree) {
  return _immutable.Map.isMap(tree);
};

exports.isImmutableTree = isImmutableTree;

var isTree = function isTree(tree) {
  return (0, _typeof2["default"])(tree) == "object" && (tree.type == "group" || tree.type == "switch_group");
};

exports.isTree = isTree;

function jsTreeToImmutable(tree) {
  return (0, _immutable.fromJS)(tree, function (key, value) {
    var outValue;

    if (key == "properties") {
      outValue = value.toOrderedMap(); // `value` should be undefined instead of null
      // JSON doesn't support undefined and replaces undefined -> null
      // So fix: null -> undefined

      for (var i = 0; i < 2; i++) {
        var _outValue$get;

        if (((_outValue$get = outValue.get("value")) === null || _outValue$get === void 0 ? void 0 : _outValue$get.get(i)) === null) {
          outValue = outValue.setIn(["value", i], undefined);
        }
      }
    } else if (key == "value" && value.get(0) && value.get(0).toJS !== undefined) {
      var valueJs = value.get(0).toJS();

      if (valueJs.func) {
        outValue = value.toOrderedMap();
      } else {
        // only for raw values keep JS representation
        outValue = _immutable["default"].List.of(valueJs);
      }
    } else if (key == "asyncListValues") {
      // keep in JS format
      outValue = value.toJS();
    } else if (key == "children1" && _immutable["default"].Iterable.isIndexed(value)) {
      outValue = new _immutable["default"].OrderedMap(value.map(function (child) {
        return [child.get("id"), child];
      }));
    } else {
      outValue = _immutable["default"].Iterable.isIndexed(value) ? value.toList() : value.toOrderedMap();
    }

    return outValue;
  });
}