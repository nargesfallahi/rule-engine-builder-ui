"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFunc = exports.setArgValueSrc = exports.setArgValue = exports.completeValue = exports.completeFuncValue = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _immutable = _interopRequireDefault(require("immutable"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// helpers
var isObject = function isObject(v) {
  return (0, _typeof2["default"])(v) == "object" && v !== null && !Array.isArray(v);
};
/**
 * @param {*} value
 * @param {string} valueSrc - 'value' | 'field' | 'func'
 * @param {object} config
 * @return {* | undefined} - undefined if func value is not complete (missing required arg vals); can return completed value != value
 */


var completeValue = function completeValue(value, valueSrc, config) {
  if (valueSrc == "func") return completeFuncValue(value, config);else return value;
};
/**
 * @param {Immutable.Map} value
 * @param {object} config
 * @return {Immutable.Map | undefined} - undefined if func value is not complete (missing required arg vals); can return completed value != value
 */


exports.completeValue = completeValue;

var completeFuncValue = function completeFuncValue(value, config) {
  var _checkFuncValue = function _checkFuncValue(value) {
    if (!value) return undefined;
    var funcKey = value.get("func");
    var funcConfig = funcKey && (0, _configUtils.getFuncConfig)(config, funcKey);
    if (!funcConfig) return undefined;
    var complValue = value;
    var tmpHasOptional = false;

    for (var argKey in funcConfig.args) {
      var argConfig = funcConfig.args[argKey];
      var valueSources = argConfig.valueSources,
          isOptional = argConfig.isOptional,
          defaultValue = argConfig.defaultValue;
      var filteredValueSources = (0, _ruleUtils.filterValueSourcesForField)(config, valueSources, argConfig);
      var args = complValue.get("args");
      var argDefaultValueSrc = filteredValueSources.length == 1 ? filteredValueSources[0] : undefined;
      var argVal = args ? args.get(argKey) : undefined;
      var argValue = argVal ? argVal.get("value") : undefined;
      var argValueSrc = (argVal ? argVal.get("valueSrc") : undefined) || argDefaultValueSrc;

      if (argValue !== undefined) {
        var completeArgValue = completeValue(argValue, argValueSrc, config);

        if (completeArgValue === undefined) {
          return undefined;
        } else if (completeArgValue !== argValue) {
          complValue = complValue.setIn(["args", argKey, "value"], completeArgValue);
        }

        if (tmpHasOptional) {
          // has gap
          return undefined;
        }
      } else if (defaultValue !== undefined && !isObject(defaultValue)) {
        complValue = complValue.setIn(["args", argKey, "value"], getDefaultArgValue(argConfig));
        complValue = complValue.setIn(["args", argKey, "valueSrc"], "value");
      } else if (isOptional) {
        // optional
        tmpHasOptional = true;
      } else {
        // missing value
        return undefined;
      }
    }

    return complValue;
  };

  return _checkFuncValue(value);
};
/**
 * @param {Immutable.Map} value 
 * @return {array} - [usedFields, badFields]
 */


exports.completeFuncValue = completeFuncValue;

var getUsedFieldsInFuncValue = function getUsedFieldsInFuncValue(value, config) {
  var usedFields = [];
  var badFields = [];

  var _traverse = function _traverse(value) {
    var args = value && value.get("args");
    if (!args) return;

    var _iterator = _createForOfIteratorHelper(args.values()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var arg = _step.value;

        if (arg.get("valueSrc") == "field") {
          var rightField = arg.get("value");

          if (rightField) {
            var rightFieldDefinition = config ? (0, _configUtils.getFieldConfig)(config, rightField) : undefined;
            if (config && !rightFieldDefinition) badFields.push(rightField);else usedFields.push(rightField);
          }
        } else if (arg.get("valueSrc") == "func") {
          _traverse(arg.get("value"));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  _traverse(value);

  return [usedFields, badFields];
};
/**
 * Used @ FuncWidget
 * @param {Immutable.Map} value 
 * @param {string} funcKey 
 * @param {object} config 
 */


var setFunc = function setFunc(value, funcKey, config) {
  var fieldSeparator = config.settings.fieldSeparator;
  value = value || new _immutable["default"].Map();

  if (Array.isArray(funcKey)) {
    // fix for cascader
    funcKey = funcKey.join(fieldSeparator);
  }

  value = value.set("func", funcKey);
  value = value.set("args", new _immutable["default"].Map()); // defaults

  var funcConfig = funcKey && (0, _configUtils.getFuncConfig)(config, funcKey);

  if (funcConfig) {
    for (var argKey in funcConfig.args) {
      var argConfig = funcConfig.args[argKey];
      var valueSources = argConfig.valueSources,
          defaultValue = argConfig.defaultValue;
      var filteredValueSources = (0, _ruleUtils.filterValueSourcesForField)(config, valueSources, argConfig);
      var firstValueSrc = filteredValueSources.length ? filteredValueSources[0] : undefined;
      var defaultValueSrc = defaultValue ? isObject(defaultValue) && !!defaultValue.func ? "func" : "value" : undefined;
      var argDefaultValueSrc = defaultValueSrc || firstValueSrc;

      if (defaultValue !== undefined) {
        value = value.setIn(["args", argKey, "value"], getDefaultArgValue(argConfig));
      }

      if (argDefaultValueSrc) {
        value = value.setIn(["args", argKey, "valueSrc"], argDefaultValueSrc);
      }
    }
  }

  return value;
};

exports.setFunc = setFunc;

var getDefaultArgValue = function getDefaultArgValue(_ref) {
  var value = _ref.defaultValue;

  if (isObject(value) && !_immutable["default"].Map.isMap(value) && value.func) {
    return _immutable["default"].fromJS(value, function (k, v) {
      return _immutable["default"].Iterable.isIndexed(v) ? v.toList() : v.toOrderedMap();
    });
  }

  return value;
};
/**
* Used @ FuncWidget
* @param {Immutable.Map} value 
* @param {string} argKey 
* @param {*} argVal 
* @param {object} argConfig 
*/


var setArgValue = function setArgValue(value, argKey, argVal, argConfig, config) {
  if (value && value.get("func")) {
    value = value.setIn(["args", argKey, "value"], argVal); // set default arg value sorce

    var valueSources = argConfig.valueSources;
    var filteredValueSources = (0, _ruleUtils.filterValueSourcesForField)(config, valueSources, argConfig);
    var argDefaultValueSrc = filteredValueSources.length == 1 ? filteredValueSources[0] : undefined;

    if (argDefaultValueSrc) {
      value = value.setIn(["args", argKey, "valueSrc"], argDefaultValueSrc);
    }
  }

  return value;
};
/**
* Used @ FuncWidget
* @param {Immutable.Map} value 
* @param {string} argKey 
* @param {string} argValSrc 
* @param {object} argConfig 
*/


exports.setArgValue = setArgValue;

var setArgValueSrc = function setArgValueSrc(value, argKey, argValSrc, _argConfig, _config) {
  if (value && value.get("func")) {
    value = value.setIn(["args", argKey], new _immutable["default"].Map({
      valueSrc: argValSrc
    }));
  }

  return value;
};

exports.setArgValueSrc = setArgValueSrc;