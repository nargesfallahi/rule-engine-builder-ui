"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyToJS = applyToJS;
exports.mapListValues = exports.logger = exports.listValuesToArray = exports.isJsonLogic = exports.isImmutable = exports.immutableEqual = exports.getValueInListValues = exports.getTitleInListValues = exports.getLogger = exports.getItemInListValues = exports.getFirstDefined = exports.flatizeTreeData = exports.escapeRegExp = exports.eqSet = exports.eqArrSet = exports.defaultValue = exports.defaultTreeDataMap = exports.deepEqual = void 0;
exports.mergeArraysSmart = mergeArraysSmart;
exports.shallowEqual = exports.removePrefixPath = exports.normalizeListValues = void 0;
exports.sleep = sleep;
exports.toImmutableList = toImmutableList;
exports.truncateString = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _immutable = _interopRequireWildcard(require("immutable"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// RegExp.quote = function (str) {
//     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
// };
var defaultValue = function defaultValue(value, _default) {
  return typeof value === "undefined" ? _default : value;
};

exports.defaultValue = defaultValue;

var truncateString = function truncateString(str, n, useWordBoundary) {
  if (!n || str.length <= n) {
    return str;
  }

  var subString = str.substr(0, n - 1);
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
};

exports.truncateString = truncateString;

var immutableEqual = function immutableEqual(v1, v2) {
  if (v1 === v2) {
    return true;
  } else {
    return v1.equals(v2);
  }
};

exports.immutableEqual = immutableEqual;

var deepEqual = function deepEqual(v1, v2) {
  if (v1 === v2) {
    return true;
  } else if (_immutable.Map.isMap(v1)) {
    return v1.equals(v2);
  } else {
    return JSON.stringify(v1) == JSON.stringify(v2);
  }
}; //Do sets have same values?


exports.deepEqual = deepEqual;

var eqSet = function eqSet(as, bs) {
  if (as.size !== bs.size) return false;

  var _iterator = _createForOfIteratorHelper(as),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      if (!bs.has(a)) return false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}; //Do arrays have same values?


exports.eqSet = eqSet;

var eqArrSet = function eqArrSet(arr1, arr2) {
  return eqSet(new Set(arr1), new Set(arr2));
};

exports.eqArrSet = eqArrSet;

var shallowEqual = function shallowEqual(a, b) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (a === b) {
    return true;
  } else if (Array.isArray(a)) return shallowEqualArrays(a, b, deep);else if (_immutable.Map.isMap(a)) return a.equals(b);else if ((0, _typeof2["default"])(a) == "object") return shallowEqualObjects(a, b, deep);else return a === b;
};

exports.shallowEqual = shallowEqual;

function shallowEqualArrays(arrA, arrB) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var isEqual = deep ? shallowEqual(arrA[i], arrB[i], deep) : arrA[i] === arrB[i];

    if (!isEqual) {
      return false;
    }
  }

  return true;
}

function shallowEqualObjects(objA, objB) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];
    var isEqual = deep ? shallowEqual(objA[key], objB[key], deep) : objA[key] === objB[key];

    if (!isEqual) {
      return false;
    }
  }

  return true;
}

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"); // $& means the whole matched string
};

exports.escapeRegExp = escapeRegExp;

var isObject = function isObject(v) {
  return (0, _typeof2["default"])(v) == "object" && v !== null;
}; // object or array


var listValue = function listValue(v, title) {
  return isObject(v) ? v : {
    value: v,
    title: title !== undefined ? title : v
  };
}; // convert {<value>: <title>, ..} or [value, ..] to normal [{value, title}, ..]


var listValuesToArray = function listValuesToArray(listValuesObj) {
  if (!isObject(listValuesObj)) return listValuesObj;
  if (Array.isArray(listValuesObj)) return listValuesObj.map(function (v) {
    return listValue(v);
  });
  var listValuesArr = [];

  for (var v in listValuesObj) {
    var title = listValuesObj[v];
    listValuesArr.push(listValue(v, title));
  }

  return listValuesArr;
}; // listValues can be {<value>: <title>, ..} or [{value, title}, ..] or [value, ..]


exports.listValuesToArray = listValuesToArray;

var getItemInListValues = function getItemInListValues(listValues, value) {
  if (Array.isArray(listValues)) {
    var values = listValues.map(function (v) {
      return listValue(v);
    });
    return values.find(function (v) {
      return v.value === value;
    }) || values.find(function (v) {
      return "".concat(v.value) === value;
    });
  } else {
    return listValues[value] !== undefined ? listValue(value, listValues[value]) : undefined;
  }
};

exports.getItemInListValues = getItemInListValues;

var getTitleInListValues = function getTitleInListValues(listValues, value) {
  if (listValues == undefined) return value;
  var it = getItemInListValues(listValues, value);
  return it !== undefined ? it.title : value;
};

exports.getTitleInListValues = getTitleInListValues;

var getValueInListValues = function getValueInListValues(listValues, value) {
  if (listValues == undefined) return value;
  var it = getItemInListValues(listValues, value);
  return it !== undefined ? it.value : value;
};

exports.getValueInListValues = getValueInListValues;

var mapListValues = function mapListValues(listValues, mapFn) {
  var ret = [];

  if (Array.isArray(listValues)) {
    var _iterator2 = _createForOfIteratorHelper(listValues),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var v = _step2.value;
        var lv = mapFn(listValue(v));
        if (lv != null) ret.push(lv);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else {
    for (var value in listValues) {
      var _lv = mapFn(listValue(value, listValues[value]));

      if (_lv != null) ret.push(_lv);
    }
  }

  return ret;
};

exports.mapListValues = mapListValues;
var defaultTreeDataMap = {
  id: "value",
  pId: "parent",
  rootPId: undefined
}; // converts from treeData to treeDataSimpleMode format (https://ant.design/components/tree-select/)
// ! modifies value of `treeData`

exports.defaultTreeDataMap = defaultTreeDataMap;

var flatizeTreeData = function flatizeTreeData(treeData) {
  var tdm = defaultTreeDataMap;
  var rind;
  var len;

  var _flatize = function _flatize(node, root, lev) {
    if (node.children) {
      if (lev == 1) node[tdm.pId] = tdm.rootPId; //optional?

      var childrenCount = node.children.length;

      var _iterator3 = _createForOfIteratorHelper(node.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var c = _step3.value;
          c[tdm.pId] = node[tdm.id];
          rind++;
          root.splice(rind, 0, c); //instead of just push

          len++;

          _flatize(c, root, lev + 1);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      delete node.children;

      if (childrenCount == 0) {
        root.splice(rind, 1);
        rind--;
        len--;
      }
    }
  };

  if (Array.isArray(treeData)) {
    len = treeData.length;

    for (rind = 0; rind < len; rind++) {
      var c = treeData[rind];
      if (!isObject(c)) continue;
      if (c[tdm.pId] !== undefined && c[tdm.pId] != tdm.rootPId) continue; //not lev 1

      _flatize(c, treeData, 1);
    }
  }

  return treeData;
};

exports.flatizeTreeData = flatizeTreeData;

var getPathInListValues = function getPathInListValues(listValues, value) {
  var tdm = defaultTreeDataMap;
  var it = getItemInListValues(listValues, value);
  var parentId = it ? it[tdm.pId] : undefined;
  var parent = parentId ? listValues.find(function (v) {
    return v[tdm.id] === parentId;
  }) : undefined;
  return parent ? [parent.value].concat((0, _toConsumableArray2["default"])(getPathInListValues(listValues, parent.value))) : [];
};

var getChildrenInListValues = function getChildrenInListValues(listValues, value) {
  var tdm = defaultTreeDataMap;
  var it = getItemInListValues(listValues, value);
  return it ? listValues.filter(function (v) {
    return v[tdm.pId] === it[tdm.id];
  }).map(function (v) {
    return v.value;
  }) : [];
}; // ! modifies value of `treeData`


var extendTreeData = function extendTreeData(treeData, fieldSettings, isMulti) {
  var _iterator4 = _createForOfIteratorHelper(treeData),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var node = _step4.value;
      node.path = getPathInListValues(treeData, node.value);

      if (fieldSettings.treeSelectOnlyLeafs != false) {
        var childrenValues = getChildrenInListValues(treeData, node.value);

        if (!isMulti) {
          node.selectable = childrenValues.length == 0;
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return treeData;
};

var normalizeListValues = function normalizeListValues(listValues, type, fieldSettings) {
  var isTree = ["treeselect", "treemultiselect"].includes(type);
  var isMulti = ["multiselect", "treemultiselect"].includes(type);

  if (isTree) {
    listValues = listValuesToArray(listValues);
    listValues = flatizeTreeData(listValues);
    listValues = extendTreeData(listValues, fieldSettings, isMulti);
  }

  return listValues;
};

exports.normalizeListValues = normalizeListValues;

var removePrefixPath = function removePrefixPath(selectedPath, parentPath) {
  if (!selectedPath) return selectedPath;
  var isPrefix = true;

  for (var i = 0; i < parentPath.length; i++) {
    var part = parentPath[i];

    if (selectedPath[i] !== undefined && part == selectedPath[i]) {//ok
    } else {
      isPrefix = false;
      break;
    }
  }

  return isPrefix ? selectedPath.slice(parentPath.length) : selectedPath;
};

exports.removePrefixPath = removePrefixPath;

var isJsonLogic = function isJsonLogic(logic) {
  return (0, _typeof2["default"])(logic) === "object" // An object
  && logic !== null // but not null
  && !Array.isArray(logic) // and not an array
  && Object.keys(logic).length === 1 // with exactly one key
  ;
};

exports.isJsonLogic = isJsonLogic;

function sleep(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

var isImmutable = function isImmutable(v) {
  return (0, _typeof2["default"])(v) === "object" && v !== null && typeof v.toJS === "function";
};

exports.isImmutable = isImmutable;

function applyToJS(v) {
  return isImmutable(v) ? v.toJS() : v;
}

function toImmutableList(v) {
  return isImmutable(v) ? v : new _immutable["default"].List(v);
} // [1, 4, 9] + [1, 5, 9] => [1, 4, 5, 9]
// Used for merging arrays of operators for different widgets of 1 type


function mergeArraysSmart(arr1, arr2) {
  if (!arr1) arr1 = [];
  if (!arr2) arr2 = [];
  return arr2.map(function (op) {
    return [op, arr1.indexOf(op)];
  }).map(function (_ref, i, orig) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        op = _ref2[0],
        ind = _ref2[1];

    if (ind == -1) {
      var next = orig.slice(i + 1);
      var prev = orig.slice(0, i);
      var after = prev.reverse().find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
            _cop = _ref4[0],
            ci = _ref4[1];

        return ci != -1;
      });
      var before = next.find(function (_ref5) {
        var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
            _cop = _ref6[0],
            ci = _ref6[1];

        return ci != -1;
      });
      if (before) return [op, "before", before[0]];else if (after) return [op, "after", after[0]];else return [op, "append", null];
    } else {
      // already exists
      return null;
    }
  }).filter(function (x) {
    return x !== null;
  }).reduce(function (acc, _ref7) {
    var _ref8 = (0, _slicedToArray2["default"])(_ref7, 3),
        newOp = _ref8[0],
        rel = _ref8[1],
        relOp = _ref8[2];

    var ind = acc.indexOf(relOp);

    if (acc.indexOf(newOp) == -1) {
      if (ind > -1) {
        // insert after or before
        acc.splice(ind + (rel == "after" ? 1 : 0), 0, newOp);
      } else {
        // insert to end or start
        acc.splice(rel == "append" ? Infinity : 0, 0, newOp);
      }
    }

    return acc;
  }, arr1.slice());
}

var isDev = function isDev() {
  return process && process.env && process.env.NODE_ENV == "development";
};

var getLogger = function getLogger() {
  var devMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var verbose = devMode != undefined ? devMode : isDev();
  return verbose ? console : {
    error: function error() {},
    log: function log() {},
    warn: function warn() {},
    debug: function debug() {},
    info: function info() {}
  };
};

exports.getLogger = getLogger;

var getFirstDefined = function getFirstDefined() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var ret;

  for (var i = 0; i < arr.length; i++) {
    var v = arr[i];

    if (v !== undefined) {
      ret = v;
      break;
    }
  }

  return ret;
};

exports.getFirstDefined = getFirstDefined;
var logger = getLogger();
exports.logger = logger;