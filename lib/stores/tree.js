"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = _interopRequireDefault(require("immutable"));

var _treeUtils = require("../utils/treeUtils");

var _defaultUtils = require("../utils/defaultUtils");

var constants = _interopRequireWildcard(require("../constants"));

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _stuff = require("../utils/stuff");

var _validation = require("../utils/validation");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */
var addNewGroup = function addNewGroup(state, path, type, groupUuid, properties, config) {
  var children = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var meta = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
  var shouldCreateEmptyGroup = config.settings.shouldCreateEmptyGroup;
  var groupPath = path.push(groupUuid);
  var canAddNewRule = !shouldCreateEmptyGroup;
  var isDefaultCase = !!(meta !== null && meta !== void 0 && meta.isDefaultCase);
  var origState = state;
  state = addItem(state, path, type, groupUuid, (0, _defaultUtils.defaultGroupProperties)(config).merge(properties || {}), config, children);

  if (state !== origState) {
    if (!children && !isDefaultCase) {
      state = state.setIn((0, _treeUtils.expandTreePath)(groupPath, "children1"), new _immutable["default"].OrderedMap()); // Add one empty rule into new group

      if (canAddNewRule) {
        state = addItem(state, groupPath, "rule", (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config), config);
      }
    }

    state = (0, _treeUtils.fixPathsInTree)(state);
  }

  return state;
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {Immutable.Map} properties
 */


var removeGroup = function removeGroup(state, path, config) {
  state = removeItem(state, path);
  var canLeaveEmptyGroup = config.settings.canLeaveEmptyGroup;
  var parentPath = path.slice(0, -1);
  var isEmptyParentGroup = !(0, _treeUtils.hasChildren)(state, parentPath);

  if (isEmptyParentGroup && !canLeaveEmptyGroup) {
    // check ancestors for emptiness (and delete 'em if empty)
    state = (0, _treeUtils.fixEmptyGroupsInTree)(state);

    if ((0, _treeUtils.isEmptyTree)(state) && !canLeaveEmptyGroup) {
      // if whole query is empty, add one empty rule to root
      state = addItem(state, new _immutable["default"].List(), "rule", (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config), config);
    }
  }

  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {object} config
 * @param {Immutable.List} path
 */


var removeRule = function removeRule(state, path, config) {
  state = removeItem(state, path);
  var canLeaveEmptyGroup = config.settings.canLeaveEmptyGroup;
  var parentPath = path.pop();
  var parent = state.getIn((0, _treeUtils.expandTreePath)(parentPath));
  var parentField = parent.getIn(["properties", "field"]);
  var parentOperator = parent.getIn(["properties", "operator"]);
  var parentValue = parent.getIn(["properties", "value", 0]);
  var parentFieldConfig = parentField ? (0, _configUtils.getFieldConfig)(config, parentField) : null;
  var parentOperatorConfig = parentOperator ? (0, _configUtils.getOperatorConfig)(config, parentOperator, parentField) : null;
  var hasGroupCountRule = parentField && parentOperator && parentOperatorConfig.cardinality != 0; // && parentValue != undefined;

  var isParentRuleGroup = parent.get("type") == "rule_group";
  var isEmptyParentGroup = !(0, _treeUtils.hasChildren)(state, parentPath);
  var canLeaveEmpty = isParentRuleGroup ? hasGroupCountRule && parentFieldConfig.initialEmptyWhere : canLeaveEmptyGroup;

  if (isEmptyParentGroup && !canLeaveEmpty) {
    if (isParentRuleGroup) {
      // deleted last rule from rule_group, so delete whole rule_group
      state = state.deleteIn((0, _treeUtils.expandTreePath)(parentPath));
    } // check ancestors for emptiness (and delete 'em if empty)


    state = (0, _treeUtils.fixEmptyGroupsInTree)(state);

    if ((0, _treeUtils.isEmptyTree)(state) && !canLeaveEmptyGroup) {
      // if whole query is empty, add one empty rule to root
      state = addItem(state, new _immutable["default"].List(), "rule", (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config), config);
    }
  }

  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {bool} not
 */


var setNot = function setNot(state, path, not) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "not"), not);
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {bool} lock
 */


var setLock = function setLock(state, path, lock) {
  return (0, _treeUtils.removeIsLockedInTree)(state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "isLocked"), lock));
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} conjunction
 */


var setConjunction = function setConjunction(state, path, conjunction) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "conjunction"), conjunction);
}; // convert children deeply from JS to Immutable


var _addChildren1 = function _addChildren1(config, item, children) {
  if (children && Array.isArray(children)) {
    item.children1 = new _immutable["default"].OrderedMap(children.reduce(function (map, it) {
      var id1 = (0, _uuid["default"])();

      var it1 = _objectSpread(_objectSpread({}, it), {}, {
        properties: (0, _defaultUtils.defaultItemProperties)(config, it).merge(it.properties || {}),
        id: id1
      });

      _addChildren1(config, it1, it1.children1); //todo: guarantee order


      return _objectSpread(_objectSpread({}, map), {}, (0, _defineProperty2["default"])({}, id1, new _immutable["default"].Map(it1)));
    }, {}));
  }
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} type
 * @param {string} id
 * @param {Immutable.OrderedMap} properties
 * @param {object} config
 */


var addItem = function addItem(state, path, type, id, properties, config) {
  var children = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  if (type == "switch_group") throw new Error("Can't add switch_group programmatically");
  var _config$settings = config.settings,
      maxNumberOfCases = _config$settings.maxNumberOfCases,
      maxNumberOfRules = _config$settings.maxNumberOfRules,
      maxNesting = _config$settings.maxNesting;
  var rootType = state.get("type");
  var isTernary = rootType == "switch_group";
  var targetItem = state.getIn((0, _treeUtils.expandTreePath)(path));
  var caseGroup = isTernary ? state.getIn((0, _treeUtils.expandTreePath)(path.take(2))) : null;
  var childrenPath = (0, _treeUtils.expandTreePath)(path, "children1");
  var targetChildren = state.getIn(childrenPath);
  var hasChildren = !!targetChildren && targetChildren.size;
  var targetChildrenSize = hasChildren ? targetChildren.size : null;
  var currentNumber, maxNumber;

  if (type == "case_group") {
    currentNumber = targetChildrenSize;
    maxNumber = maxNumberOfCases;
  } else if (type == "group") {
    currentNumber = path.size;
    maxNumber = maxNesting;
  } else if ((targetItem === null || targetItem === void 0 ? void 0 : targetItem.get("type")) == "rule_group") {// don't restrict
  } else {
    currentNumber = isTernary ? (0, _treeUtils.getTotalRulesCountInTree)(caseGroup) : (0, _treeUtils.getTotalRulesCountInTree)(state);
    maxNumber = maxNumberOfRules;
  }

  var canAdd = maxNumber && currentNumber ? currentNumber < maxNumber : true;
  var item = {
    type: type,
    id: id,
    properties: properties
  };

  _addChildren1(config, item, children);

  var isLastDefaultCase = type == "case_group" && hasChildren && targetChildren.last().get("children1") == null;

  if (canAdd) {
    var newChildren = new _immutable["default"].OrderedMap((0, _defineProperty2["default"])({}, id, new _immutable["default"].Map(item)));

    if (!hasChildren) {
      state = state.setIn(childrenPath, newChildren);
    } else if (isLastDefaultCase) {
      var _Immutable$OrderedMap2;

      var last = targetChildren.last();
      var newChildrenWithLast = new _immutable["default"].OrderedMap((_Immutable$OrderedMap2 = {}, (0, _defineProperty2["default"])(_Immutable$OrderedMap2, id, new _immutable["default"].Map(item)), (0, _defineProperty2["default"])(_Immutable$OrderedMap2, last.get("id"), last), _Immutable$OrderedMap2));
      state = state.deleteIn((0, _treeUtils.expandTreePath)(childrenPath, "children1", last.get("id")));
      state = state.mergeIn(childrenPath, newChildrenWithLast);
    } else {
      state = state.mergeIn(childrenPath, newChildren);
    }

    state = (0, _treeUtils.fixPathsInTree)(state);
  }

  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 */


var removeItem = function removeItem(state, path) {
  state = state.deleteIn((0, _treeUtils.expandTreePath)(path));
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} fromPath
 * @param {Immutable.List} toPath
 * @param {string} placement, see constants PLACEMENT_*: PLACEMENT_AFTER, PLACEMENT_BEFORE, PLACEMENT_APPEND, PLACEMENT_PREPEND
 * @param {object} config
 */


var moveItem = function moveItem(state, fromPath, toPath, placement, config) {
  var from = (0, _treeUtils.getItemByPath)(state, fromPath);
  var sourcePath = fromPath.pop();
  var source = fromPath.size > 1 ? (0, _treeUtils.getItemByPath)(state, sourcePath) : null;
  var sourceChildren = source ? source.get("children1") : null;
  var to = (0, _treeUtils.getItemByPath)(state, toPath);
  var targetPath = placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND ? toPath : toPath.pop();
  var target = placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND ? to : toPath.size > 1 ? (0, _treeUtils.getItemByPath)(state, targetPath) : null;
  var targetChildren = target ? target.get("children1") : null;
  if (!source || !target) return state;
  var isSameParent = source.get("id") == target.get("id");
  var isSourceInsideTarget = targetPath.size < sourcePath.size && (0, _stuff.deepEqual)(targetPath.toArray(), sourcePath.toArray().slice(0, targetPath.size));
  var isTargetInsideSource = targetPath.size > sourcePath.size && (0, _stuff.deepEqual)(sourcePath.toArray(), targetPath.toArray().slice(0, sourcePath.size));
  var sourceSubpathFromTarget = null;
  var targetSubpathFromSource = null;

  if (isSourceInsideTarget) {
    sourceSubpathFromTarget = _immutable["default"].List(sourcePath.toArray().slice(targetPath.size));
  } else if (isTargetInsideSource) {
    targetSubpathFromSource = _immutable["default"].List(targetPath.toArray().slice(sourcePath.size));
  }

  var newTargetChildren = targetChildren,
      newSourceChildren = sourceChildren;
  if (!isTargetInsideSource) newSourceChildren = newSourceChildren["delete"](from.get("id"));

  if (isSameParent) {
    newTargetChildren = newSourceChildren;
  } else if (isSourceInsideTarget) {
    newTargetChildren = newTargetChildren.updateIn((0, _treeUtils.expandTreeSubpath)(sourceSubpathFromTarget, "children1"), function (_oldChildren) {
      return newSourceChildren;
    });
  }

  if (placement == constants.PLACEMENT_BEFORE || placement == constants.PLACEMENT_AFTER) {
    newTargetChildren = _immutable["default"].OrderedMap().withMutations(function (r) {
      var _iterator = _createForOfIteratorHelper(newTargetChildren.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              itemId = _step$value[0],
              item = _step$value[1];

          if (itemId == to.get("id") && placement == constants.PLACEMENT_BEFORE) {
            r.set(from.get("id"), from);
          }

          r.set(itemId, item);

          if (itemId == to.get("id") && placement == constants.PLACEMENT_AFTER) {
            r.set(from.get("id"), from);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  } else if (placement == constants.PLACEMENT_APPEND) {
    newTargetChildren = newTargetChildren.merge((0, _defineProperty2["default"])({}, from.get("id"), from));
  } else if (placement == constants.PLACEMENT_PREPEND) {
    newTargetChildren = _immutable["default"].OrderedMap((0, _defineProperty2["default"])({}, from.get("id"), from)).merge(newTargetChildren);
  }

  if (isTargetInsideSource) {
    newSourceChildren = newSourceChildren.updateIn((0, _treeUtils.expandTreeSubpath)(targetSubpathFromSource, "children1"), function (_oldChildren) {
      return newTargetChildren;
    });
    newSourceChildren = newSourceChildren["delete"](from.get("id"));
  }

  if (!isSameParent && !isSourceInsideTarget) state = state.updateIn((0, _treeUtils.expandTreePath)(sourcePath, "children1"), function (_oldChildren) {
    return newSourceChildren;
  });
  if (!isTargetInsideSource) state = state.updateIn((0, _treeUtils.expandTreePath)(targetPath, "children1"), function (_oldChildren) {
    return newTargetChildren;
  });
  state = (0, _treeUtils.fixPathsInTree)(state);
  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} field
 */


var setField = function setField(state, path, newField, config) {
  if (!newField) return removeItem(state, path);
  var _config$settings2 = config.settings,
      fieldSeparator = _config$settings2.fieldSeparator,
      setOpOnChangeField = _config$settings2.setOpOnChangeField,
      showErrorMessage = _config$settings2.showErrorMessage;
  if (Array.isArray(newField)) newField = newField.join(fieldSeparator);
  var currentType = state.getIn((0, _treeUtils.expandTreePath)(path, "type"));
  var currentProperties = state.getIn((0, _treeUtils.expandTreePath)(path, "properties"));
  var wasRuleGroup = currentType == "rule_group";
  var newFieldConfig = (0, _configUtils.getFieldConfig)(config, newField);
  var isRuleGroup = newFieldConfig.type == "!group";
  var isRuleGroupExt = isRuleGroup && newFieldConfig.mode == "array";
  var isChangeToAnotherType = wasRuleGroup != isRuleGroup;
  var currentOperator = currentProperties.get("operator");
  var currentOperatorOptions = currentProperties.get("operatorOptions");

  var _currentField = currentProperties.get("field");

  var _currentValue = currentProperties.get("value");

  var _currentValueSrc = currentProperties.get("valueSrc", new _immutable["default"].List());

  var _currentValueType = currentProperties.get("valueType", new _immutable["default"].List()); // If the newly selected field supports the same operator the rule currently
  // uses, keep it selected.


  var lastOp = newFieldConfig && newFieldConfig.operators.indexOf(currentOperator) !== -1 ? currentOperator : null;
  var newOperator = null;
  var availOps = (0, _ruleUtils.getOperatorsForField)(config, newField);
  if (availOps && availOps.length == 1) newOperator = availOps[0];else if (availOps && availOps.length > 1) {
    var _iterator2 = _createForOfIteratorHelper(setOpOnChangeField || []),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var strategy = _step2.value;
        if (strategy == "keep" && !isChangeToAnotherType) newOperator = lastOp;else if (strategy == "default") newOperator = (0, _defaultUtils.defaultOperator)(config, newField, false);else if (strategy == "first") newOperator = (0, _ruleUtils.getFirstOperator)(config, newField);
        if (newOperator) //found op for strategy
          break;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  if (!isRuleGroup && !newFieldConfig.operators) {
    console.warn("Type ".concat(newFieldConfig.type, " is not supported"));
    return state;
  }

  if (wasRuleGroup && !isRuleGroup) {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "type"), "rule");
    state = state.deleteIn((0, _treeUtils.expandTreePath)(path, "children1"));
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties"), new _immutable["default"].OrderedMap());
  }

  if (isRuleGroup) {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "type"), "rule_group");

    var _getNewValueForFieldO = (0, _ruleUtils.getNewValueForFieldOp)(config, config, currentProperties, newField, newOperator, "field", true),
        canReuseValue = _getNewValueForFieldO.canReuseValue,
        newValue = _getNewValueForFieldO.newValue,
        newValueSrc = _getNewValueForFieldO.newValueSrc,
        newValueType = _getNewValueForFieldO.newValueType,
        operatorCardinality = _getNewValueForFieldO.operatorCardinality;

    var groupProperties = (0, _defaultUtils.defaultGroupProperties)(config, newFieldConfig).merge({
      field: newField,
      mode: newFieldConfig.mode
    });

    if (isRuleGroupExt) {
      groupProperties = groupProperties.merge({
        operator: newOperator,
        value: newValue,
        valueSrc: newValueSrc,
        valueType: newValueType
      });
    }

    state = state.setIn((0, _treeUtils.expandTreePath)(path, "children1"), new _immutable["default"].OrderedMap());
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties"), groupProperties);

    if (newFieldConfig.initialEmptyWhere && operatorCardinality == 1) {// just `COUNT(grp) > 1` without `HAVING ..`
      // no childeren
    } else {
      state = addItem(state, path, "rule", (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config, newField), config);
    }

    state = (0, _treeUtils.fixPathsInTree)(state);
    return state;
  }

  return state.updateIn((0, _treeUtils.expandTreePath)(path, "properties"), function (map) {
    return map.withMutations(function (current) {
      var _getNewValueForFieldO2 = (0, _ruleUtils.getNewValueForFieldOp)(config, config, current, newField, newOperator, "field", true),
          canReuseValue = _getNewValueForFieldO2.canReuseValue,
          newValue = _getNewValueForFieldO2.newValue,
          newValueSrc = _getNewValueForFieldO2.newValueSrc,
          newValueType = _getNewValueForFieldO2.newValueType,
          newValueError = _getNewValueForFieldO2.newValueError;

      if (showErrorMessage) {
        current = current.set("valueError", newValueError);
      }

      var newOperatorOptions = canReuseValue ? currentOperatorOptions : (0, _defaultUtils.defaultOperatorOptions)(config, newOperator, newField);
      return current.set("field", newField).set("operator", newOperator).set("operatorOptions", newOperatorOptions).set("value", newValue).set("valueSrc", newValueSrc).set("valueType", newValueType)["delete"]("asyncListValues");
    });
  });
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} operator
 */


var setOperator = function setOperator(state, path, newOperator, config) {
  var showErrorMessage = config.settings.showErrorMessage;
  var properties = state.getIn((0, _treeUtils.expandTreePath)(path, "properties"));
  var children = state.getIn((0, _treeUtils.expandTreePath)(path, "children1"));
  var currentField = properties.get("field");
  var fieldConfig = (0, _configUtils.getFieldConfig)(config, currentField);
  var isRuleGroup = fieldConfig.type == "!group";
  var operatorConfig = (0, _configUtils.getOperatorConfig)(config, newOperator, currentField);
  var operatorCardinality = operatorConfig ? (0, _stuff.defaultValue)(operatorConfig.cardinality, 1) : null;
  state = state.updateIn((0, _treeUtils.expandTreePath)(path, "properties"), function (map) {
    return map.withMutations(function (current) {
      var currentField = current.get("field");
      var currentOperatorOptions = current.get("operatorOptions");

      var _currentValue = current.get("value", new _immutable["default"].List());

      var _currentValueSrc = current.get("valueSrc", new _immutable["default"].List());

      var _currentOperator = current.get("operator");

      var _getNewValueForFieldO3 = (0, _ruleUtils.getNewValueForFieldOp)(config, config, current, currentField, newOperator, "operator", true),
          canReuseValue = _getNewValueForFieldO3.canReuseValue,
          newValue = _getNewValueForFieldO3.newValue,
          newValueSrc = _getNewValueForFieldO3.newValueSrc,
          newValueType = _getNewValueForFieldO3.newValueType,
          newValueError = _getNewValueForFieldO3.newValueError;

      if (showErrorMessage) {
        current = current.set("valueError", newValueError);
      }

      var newOperatorOptions = canReuseValue ? currentOperatorOptions : (0, _defaultUtils.defaultOperatorOptions)(config, newOperator, currentField);

      if (!canReuseValue) {
        current = current["delete"]("asyncListValues");
      }

      return current.set("operator", newOperator).set("operatorOptions", newOperatorOptions).set("value", newValue).set("valueSrc", newValueSrc).set("valueType", newValueType);
    });
  });

  if (isRuleGroup) {
    if (operatorCardinality == 0 && children.size == 0) {
      state = addItem(state, path, "rule", (0, _uuid["default"])(), (0, _defaultUtils.defaultRuleProperties)(config, currentField), config);
    }
  }

  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} value
 * @param {string} valueType
 * @param {*} asyncListValues
 * @param {boolean} __isInternal
 */


var setValue = function setValue(state, path, delta, value, valueType, config, asyncListValues, __isInternal) {
  var _config$settings3 = config.settings,
      fieldSeparator = _config$settings3.fieldSeparator,
      showErrorMessage = _config$settings3.showErrorMessage;
  var isInternalValueChange;
  var valueSrc = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "valueSrc", delta + "")) || null;
  if (valueSrc === "field" && Array.isArray(value)) value = value.join(fieldSeparator);
  var field = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "field")) || null;
  var operator = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "operator")) || null;
  var operatorConfig = (0, _configUtils.getOperatorConfig)(config, operator, field);
  var operatorCardinality = operator ? (0, _stuff.defaultValue)(operatorConfig.cardinality, 1) : null;
  var isEndValue = false;
  var canFix = false;
  var calculatedValueType = valueType || calculateValueType(value, valueSrc, config);

  var _validateValue = (0, _validation.validateValue)(config, field, field, operator, value, calculatedValueType, valueSrc, asyncListValues, canFix, isEndValue),
      _validateValue2 = (0, _slicedToArray2["default"])(_validateValue, 2),
      validateError = _validateValue2[0],
      fixedValue = _validateValue2[1];

  var isValid = !validateError;

  if (isValid && fixedValue !== value) {
    // eg, get exact value from listValues (not string)
    value = fixedValue;
  } // Additional validation for range values


  if (showErrorMessage) {
    var w = (0, _ruleUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
    var fieldWidgetDefinition = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, w, valueSrc);
    var valueSrcs = Array.from({
      length: operatorCardinality
    }, function (_, i) {
      return state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "valueSrc", i + "")) || null;
    });

    if (operatorConfig && operatorConfig.validateValues && valueSrcs.filter(function (vs) {
      return vs == "value" || vs == null;
    }).length == operatorCardinality) {
      var values = Array.from({
        length: operatorCardinality
      }, function (_, i) {
        return i == delta ? value : state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "value", i + "")) || null;
      });
      var jsValues = fieldWidgetDefinition && fieldWidgetDefinition.toJS ? values.map(function (v) {
        return fieldWidgetDefinition.toJS(v, fieldWidgetDefinition);
      }) : values;
      var rangeValidateError = operatorConfig.validateValues(jsValues);
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", operatorCardinality), rangeValidateError);
    }
  }

  var lastValueArr = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "value"));

  if (!lastValueArr) {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "value"), new _immutable["default"].List(new Array(operatorCardinality))).setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueType"), new _immutable["default"].List(new Array(operatorCardinality))).setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError"), new _immutable["default"].List(new Array(operatorCardinality)));
  }

  var lastValue = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "value", delta + ""));
  var lastError = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", delta));
  var isLastEmpty = lastValue == undefined;
  var isLastError = !!lastError;

  if (isValid || showErrorMessage) {
    state = state.deleteIn((0, _treeUtils.expandTreePath)(path, "properties", "asyncListValues")); // set only good value

    if (typeof value === "undefined") {
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "value", delta + ""), undefined);
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueType", delta + ""), null);
    } else {
      if (asyncListValues) {
        state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "asyncListValues"), asyncListValues);
      }

      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "value", delta + ""), value);
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueType", delta + ""), calculatedValueType);
      isInternalValueChange = __isInternal && !isLastEmpty && !isLastError;
    }
  }

  if (showErrorMessage) {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", delta), validateError);
  }

  if (__isInternal && (isValid && isLastError || !isValid && !isLastError)) {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", delta), validateError);
    isInternalValueChange = false;
  }

  return {
    tree: state,
    isInternalValueChange: isInternalValueChange
  };
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {integer} delta
 * @param {*} srcKey
 */


var setValueSrc = function setValueSrc(state, path, delta, srcKey, config) {
  var showErrorMessage = config.settings.showErrorMessage;
  var field = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "field")) || null;
  var operator = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "operator")) || null;
  state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "value", delta + ""), undefined);
  state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueType", delta + ""), null);
  state = state.deleteIn((0, _treeUtils.expandTreePath)(path, "properties", "asyncListValues"));

  if (showErrorMessage) {
    // clear value error
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", delta), null); // if current operator is range, clear possible range error

    var operatorConfig = (0, _configUtils.getOperatorConfig)(config, operator, field);
    var operatorCardinality = operator ? (0, _stuff.defaultValue)(operatorConfig.cardinality, 1) : null;

    if (operatorConfig.validateValues) {
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueError", operatorCardinality), null);
    }
  } // set valueSrc


  if (typeof srcKey === "undefined") {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueSrc", delta + ""), null);
  } else {
    state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueSrc", delta + ""), srcKey);
  } // maybe set default value


  if (srcKey) {
    var properties = state.getIn((0, _treeUtils.expandTreePath)(path, "properties")); // this call should return canReuseValue = false and provide default value

    var _getNewValueForFieldO4 = (0, _ruleUtils.getNewValueForFieldOp)(config, config, properties, field, operator, "valueSrc", true),
        canReuseValue = _getNewValueForFieldO4.canReuseValue,
        newValue = _getNewValueForFieldO4.newValue,
        newValueSrc = _getNewValueForFieldO4.newValueSrc,
        newValueType = _getNewValueForFieldO4.newValueType,
        newValueError = _getNewValueForFieldO4.newValueError;

    if (!canReuseValue && newValueSrc.get(delta) == srcKey) {
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "value", delta + ""), newValue.get(delta));
      state = state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "valueType", delta + ""), newValueType.get(delta));
    }
  }

  return state;
};
/**
 * @param {Immutable.Map} state
 * @param {Immutable.List} path
 * @param {string} name
 * @param {*} value
 */


var setOperatorOption = function setOperatorOption(state, path, name, value) {
  return state.setIn((0, _treeUtils.expandTreePath)(path, "properties", "operatorOptions", name), value);
};
/**
 * @param {Immutable.Map} state
 */


var checkEmptyGroups = function checkEmptyGroups(state, config) {
  var canLeaveEmptyGroup = config.settings.canLeaveEmptyGroup;

  if (!canLeaveEmptyGroup) {
    state = (0, _treeUtils.fixEmptyGroupsInTree)(state);
  }

  return state;
};
/**
 * 
 */


var calculateValueType = function calculateValueType(value, valueSrc, config) {
  var calculatedValueType = null;

  if (value) {
    if (valueSrc === "field") {
      var fieldConfig = (0, _configUtils.getFieldConfig)(config, value);

      if (fieldConfig) {
        calculatedValueType = fieldConfig.type;
      }
    } else if (valueSrc === "func") {
      var funcKey = value.get("func");

      if (funcKey) {
        var funcConfig = (0, _configUtils.getFuncConfig)(config, funcKey);

        if (funcConfig) {
          calculatedValueType = funcConfig.returnType;
        }
      }
    }
  }

  return calculatedValueType;
};

var getField = function getField(state, path) {
  var field = state.getIn((0, _treeUtils.expandTreePath)(path, "properties", "field")) || null;
  return field;
};

var emptyDrag = {
  dragging: {
    id: null,
    x: null,
    y: null,
    w: null,
    h: null
  },
  mousePos: {},
  dragStart: {
    id: null
  }
};

var getActionMeta = function getActionMeta(action, state) {
  var actionKeysToOmit = ["config", "asyncListValues", "__isInternal"];
  var actionTypesToIgnore = [constants.SET_TREE, constants.SET_DRAG_START, constants.SET_DRAG_PROGRESS, constants.SET_DRAG_END];
  var meta = (0, _mapValues["default"])((0, _omit["default"])(action, actionKeysToOmit), _stuff.applyToJS);
  var affectedField = action.path && getField(state.tree, action.path) || action.field;
  if (affectedField) meta.affectedField = affectedField;
  if (actionTypesToIgnore.includes(action.type) || action.type.indexOf("@@redux") == 0) meta = null;
  return meta;
};
/**
 * @param {Immutable.Map} state
 * @param {object} action
 */


var _default = function _default(config) {
  var emptyTree = (0, _defaultUtils.defaultRoot)(config);
  var emptyState = Object.assign({}, {
    tree: emptyTree
  }, emptyDrag);
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var unset = {
      __isInternalValueChange: undefined,
      __lastAction: undefined
    };
    var set = {};
    var actionMeta = getActionMeta(action, state);

    switch (action.type) {
      case constants.SET_TREE:
        {
          set.tree = action.tree;
          break;
        }

      case constants.ADD_CASE_GROUP:
        {
          set.tree = addNewGroup(state.tree, action.path, "case_group", action.id, action.properties, action.config, action.children, action.meta);
          break;
        }

      case constants.ADD_GROUP:
        {
          set.tree = addNewGroup(state.tree, action.path, "group", action.id, action.properties, action.config, action.children, action.meta);
          break;
        }

      case constants.REMOVE_GROUP:
        {
          set.tree = removeGroup(state.tree, action.path, action.config);
          break;
        }

      case constants.ADD_RULE:
        {
          set.tree = addItem(state.tree, action.path, action.ruleType, action.id, action.properties, action.config, action.children);
          break;
        }

      case constants.REMOVE_RULE:
        {
          set.tree = removeRule(state.tree, action.path, action.config);
          break;
        }

      case constants.SET_CONJUNCTION:
        {
          set.tree = setConjunction(state.tree, action.path, action.conjunction);
          break;
        }

      case constants.SET_NOT:
        {
          set.tree = setNot(state.tree, action.path, action.not);
          break;
        }

      case constants.SET_FIELD:
        {
          set.tree = setField(state.tree, action.path, action.field, action.config);
          break;
        }

      case constants.SET_LOCK:
        {
          set.tree = setLock(state.tree, action.path, action.lock);
          break;
        }

      case constants.SET_OPERATOR:
        {
          set.tree = setOperator(state.tree, action.path, action.operator, action.config);
          break;
        }

      case constants.SET_VALUE:
        {
          var _setValue = setValue(state.tree, action.path, action.delta, action.value, action.valueType, action.config, action.asyncListValues, action.__isInternal),
              tree = _setValue.tree,
              isInternalValueChange = _setValue.isInternalValueChange;

          set.__isInternalValueChange = isInternalValueChange;
          set.tree = tree;
          break;
        }

      case constants.SET_VALUE_SRC:
        {
          set.tree = setValueSrc(state.tree, action.path, action.delta, action.srcKey, action.config);
          break;
        }

      case constants.SET_OPERATOR_OPTION:
        {
          set.tree = setOperatorOption(state.tree, action.path, action.name, action.value);
          break;
        }

      case constants.MOVE_ITEM:
        {
          set.tree = moveItem(state.tree, action.fromPath, action.toPath, action.placement, action.config);
          break;
        }

      case constants.SET_DRAG_START:
        {
          set.dragStart = action.dragStart;
          set.dragging = action.dragging;
          set.mousePos = action.mousePos;
          break;
        }

      case constants.SET_DRAG_PROGRESS:
        {
          set.mousePos = action.mousePos;
          set.dragging = action.dragging;
          break;
        }

      case constants.SET_DRAG_END:
        {
          set.tree = checkEmptyGroups(state.tree, config);
          set = _objectSpread(_objectSpread({}, set), emptyDrag);
          break;
        }

      default:
        {
          break;
        }
    }

    if (actionMeta) {
      set.__lastAction = actionMeta;
    }

    return _objectSpread(_objectSpread(_objectSpread({}, state), unset), set);
  };
};

exports["default"] = _default;