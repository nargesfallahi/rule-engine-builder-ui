"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFromJsonLogic = exports._loadFromJsonLogic = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _stuff = require("../utils/stuff");

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _tree = require("./tree");

var _defaultUtils = require("../utils/defaultUtils");

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// http://jsonlogic.com/
// helpers
var arrayUniq = function arrayUniq(arr) {
  return Array.from(new Set(arr));
};

var arrayToObject = function arrayToObject(arr) {
  return arr.reduce(function (acc, _ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        f = _ref2[0],
        fc = _ref2[1];

    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, f, fc));
  }, {});
};

var loadFromJsonLogic = function loadFromJsonLogic(logicTree, config) {
  return _loadFromJsonLogic(logicTree, config, false);
};

exports.loadFromJsonLogic = loadFromJsonLogic;

var _loadFromJsonLogic = function _loadFromJsonLogic(logicTree, config) {
  var returnErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  //meta is mutable
  var meta = {
    errors: []
  };
  var extendedConfig = (0, _configUtils.extendConfig)(config);
  var conv = buildConv(extendedConfig);
  var jsTree = logicTree ? convertFromLogic(logicTree, conv, extendedConfig, "rule", meta) : undefined;

  if (jsTree && jsTree.type != "group") {
    jsTree = wrapInDefaultConj(jsTree, extendedConfig);
  }

  var immTree = jsTree ? (0, _tree.loadTree)(jsTree) : undefined;

  if (returnErrors) {
    return [immTree, meta.errors];
  } else {
    if (meta.errors.length) console.warn("Errors while importing from JsonLogic:", meta.errors);
    return immTree;
  }
};

exports._loadFromJsonLogic = _loadFromJsonLogic;

var buildConv = function buildConv(config) {
  var operators = {};

  for (var opKey in config.operators) {
    var opConfig = config.operators[opKey];

    if (typeof opConfig.jsonLogic == "string") {
      // example: "</2", "#in/1"
      var opk = (opConfig._jsonLogicIsRevArgs ? "#" : "") + opConfig.jsonLogic + "/" + (0, _stuff.defaultValue)(opConfig.cardinality, 1);
      if (!operators[opk]) operators[opk] = [];
      operators[opk].push(opKey);
    } else if (typeof opConfig.jsonLogic2 == "string") {
      // example: all-in/1"
      var _opk = opConfig.jsonLogic2 + "/" + (0, _stuff.defaultValue)(opConfig.cardinality, 1);

      if (!operators[_opk]) operators[_opk] = [];

      operators[_opk].push(opKey);
    }
  }

  var conjunctions = {};

  for (var conjKey in config.conjunctions) {
    var conjunctionDefinition = config.conjunctions[conjKey];
    var ck = conjunctionDefinition.jsonLogicConj || conjKey.toLowerCase();
    conjunctions[ck] = conjKey;
  }

  var funcs = {};

  for (var funcKey in config.funcs) {
    var funcConfig = config.funcs[funcKey];
    var fk = void 0;

    if (funcConfig.jsonLogicIsMethod) {
      fk = "#" + funcConfig.jsonLogic;
    } else if (typeof funcConfig.jsonLogic == "string") {
      fk = funcConfig.jsonLogic;
    }

    if (fk) {
      if (!funcs[fk]) funcs[fk] = [];
      funcs[fk].push(funcKey);
    }
  }

  var _config$settings$json = config.settings.jsonLogic,
      groupVarKey = _config$settings$json.groupVarKey,
      altVarKey = _config$settings$json.altVarKey;
  return {
    operators: operators,
    conjunctions: conjunctions,
    funcs: funcs,
    varKeys: ["var", groupVarKey, altVarKey]
  };
};

var convertFromLogic = function convertFromLogic(logic, conv, config, expectedType, meta) {
  var not = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var fieldConfig = arguments.length > 6 ? arguments[6] : undefined;
  var widget = arguments.length > 7 ? arguments[7] : undefined;
  var parentField = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

  var _isLockedLogic = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;

  var op, vals;

  if ((0, _stuff.isJsonLogic)(logic)) {
    op = Object.keys(logic)[0];
    vals = logic[op];
    if (!Array.isArray(vals)) vals = [vals];
  }

  var ret;
  var beforeErrorsCnt = meta.errors.length;
  var lockedOp = config.settings.jsonLogic.lockedOp;
  var isEmptyOp = op == "!" && vals.length == 1 && vals[0] && (0, _stuff.isJsonLogic)(vals[0]) && conv.varKeys.includes(Object.keys(vals[0])[0]);
  var isRev = op == "!" && !isEmptyOp;
  var isLocked = lockedOp && op == lockedOp;

  if (isLocked) {
    ret = convertFromLogic(vals[0], conv, config, expectedType, meta, not, fieldConfig, widget, parentField, true);
  } else if (isRev) {
    // reverse with not
    ret = convertFromLogic(vals[0], conv, config, expectedType, meta, !not, fieldConfig, widget, parentField);
  } else if (expectedType == "val") {
    // not is not used here
    ret = convertField(op, vals, conv, config, not, meta, parentField) || convertFunc(op, vals, conv, config, not, fieldConfig, meta, parentField) || convertVal(logic, fieldConfig, widget, config, meta);
  } else if (expectedType == "rule") {
    ret = convertConj(op, vals, conv, config, not, meta, parentField, false) || convertOp(op, vals, conv, config, not, meta, parentField);
  }

  var afterErrorsCnt = meta.errors.length;

  if (op != "!" && ret === undefined && afterErrorsCnt == beforeErrorsCnt) {
    meta.errors.push("Can't parse logic ".concat(JSON.stringify(logic)));
  }

  if (isLocked) {
    ret.properties.isLocked = true;
  }

  return ret;
};

var convertVal = function convertVal(val, fieldConfig, widget, config, meta) {
  if (val === undefined) return undefined;
  var widgetConfig = config.widgets[widget || fieldConfig.mainWidget];

  if (!widgetConfig) {
    meta.errors.push("No widget for type ".concat(fieldConfig.type));
    return undefined;
  }

  if ((0, _stuff.isJsonLogic)(val)) {
    meta.errors.push("Unexpected logic in value: ".concat(JSON.stringify(val)));
    return undefined;
  } // number of seconds -> time string


  if (fieldConfig && fieldConfig.type == "time" && typeof val == "number") {
    var h = Math.floor(val / 60 / 60) % 24,
        m = Math.floor(val / 60) % 60,
        s = val % 60;
    var valueFormat = widgetConfig.valueFormat;

    if (valueFormat) {
      var dateVal = new Date(val);
      dateVal.setMilliseconds(0);
      dateVal.setHours(h);
      dateVal.setMinutes(m);
      dateVal.setSeconds(s);
      val = (0, _moment["default"])(dateVal).format(valueFormat);
    } else {
      val = "".concat(h, ":").concat(m, ":").concat(s);
    }
  } // "2020-01-08T22:00:00.000Z" -> Date object


  if (fieldConfig && ["date", "datetime"].includes(fieldConfig.type) && val && !(val instanceof Date)) {
    try {
      var _dateVal = new Date(val);

      if (_dateVal instanceof Date && _dateVal.toISOString() === val) {
        val = _dateVal;
      }
    } catch (e) {
      meta.errors.push("Can't convert value ".concat(val, " as Date"));
      val = undefined;
    }
  } // Date object -> formatted string


  if (val instanceof Date && fieldConfig) {
    var _valueFormat = widgetConfig.valueFormat;

    if (_valueFormat) {
      val = (0, _moment["default"])(val).format(_valueFormat);
    }
  }

  var asyncListValues;

  if (val && fieldConfig.fieldSettings && fieldConfig.fieldSettings.asyncFetch) {
    var vals = Array.isArray(val) ? val : [val];
    asyncListValues = vals;
  }

  return {
    valueSrc: "value",
    value: val,
    valueType: widgetConfig.type,
    asyncListValues: asyncListValues
  };
};

var convertField = function convertField(op, vals, conv, config, not, meta) {
  var parentField = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var fieldSeparator = config.settings.fieldSeparator;

  if (conv.varKeys.includes(op) && typeof vals[0] == "string") {
    var field = vals[0];
    if (parentField) field = [parentField, field].join(fieldSeparator);
    field = (0, _configUtils.normalizeField)(config, field);
    var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);

    if (!fieldConfig) {
      meta.errors.push("No config for field ".concat(field));
      return undefined;
    }

    return {
      valueSrc: "field",
      value: field,
      valueType: fieldConfig.type
    };
  }

  return undefined;
};

var convertFunc = function convertFunc(op, vals, conv, config, not, fieldConfig, meta) {
  var parentField = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  if (!op) return undefined;
  var func, argsArr, funcKey;
  var jsonLogicIsMethod = op == "method";

  if (jsonLogicIsMethod) {
    var obj, opts;

    var _vals = (0, _toArray2["default"])(vals);

    obj = _vals[0];
    func = _vals[1];
    opts = _vals.slice(2);
    argsArr = [obj].concat((0, _toConsumableArray2["default"])(opts));
  } else {
    func = op;
    argsArr = vals;
  }

  var fk = (jsonLogicIsMethod ? "#" : "") + func;
  var funcKeys = (conv.funcs[fk] || []).filter(function (k) {
    return fieldConfig ? config.funcs[k].returnType == fieldConfig.type : true;
  });

  if (funcKeys.length) {
    funcKey = funcKeys[0];
  } else {
    var v = (0, _defineProperty2["default"])({}, op, vals);

    for (var _i = 0, _Object$entries = Object.entries(config.funcs || {}); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
          f = _Object$entries$_i[0],
          fc = _Object$entries$_i[1];

      if (fc.jsonLogicImport && fc.returnType == fieldConfig.type) {
        var parsed = void 0;

        try {
          parsed = fc.jsonLogicImport(v);
        } catch (_e) {// given expression `v` can't be parsed into function
        }

        if (parsed) {
          funcKey = f;
          argsArr = parsed;
        }
      }
    }
  }

  if (!funcKey) return undefined;

  if (funcKey) {
    var funcConfig = config.funcs[funcKey];
    var argKeys = Object.keys(funcConfig.args || {});
    var args = argsArr.reduce(function (acc, val, ind) {
      var argKey = argKeys[ind];
      var argConfig = funcConfig.args[argKey];
      var argVal = convertFromLogic(val, conv, config, "val", meta, false, argConfig, null, parentField);

      if (argVal === undefined) {
        argVal = argConfig.defaultValue;

        if (argVal === undefined) {
          meta.errors.push("No value for arg ".concat(argKey, " of func ").concat(funcKey));
          return undefined;
        }
      }

      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, argKey, argVal));
    }, {});
    return {
      valueSrc: "func",
      value: {
        func: funcKey,
        args: args
      },
      valueType: funcConfig.returnType
    };
  }

  return undefined;
};

var convertConj = function convertConj(op, vals, conv, config, not, meta) {
  var parentField = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var isRuleGroup = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var conjKey = conv.conjunctions[op];
  var fieldSeparator = config.settings.fieldSeparator;
  var parentFieldConfig = parentField ? (0, _configUtils.getFieldConfig)(config, parentField) : null;
  var isParentGroup = (parentFieldConfig === null || parentFieldConfig === void 0 ? void 0 : parentFieldConfig.type) == "!group";

  if (conjKey) {
    var type = "group";
    var children = vals.map(function (v) {
      return convertFromLogic(v, conv, config, "rule", meta, false, null, null, parentField);
    }).filter(function (r) {
      return r !== undefined;
    }).reduce(function (acc, r) {
      return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, r.id, r));
    }, {});
    var complexFields = Object.values(children).map(function (v) {
      var _v$properties;

      return v === null || v === void 0 ? void 0 : (_v$properties = v.properties) === null || _v$properties === void 0 ? void 0 : _v$properties.field;
    }).filter(function (f) {
      return f && f.includes(fieldSeparator);
    });
    var complexFieldsGroupAncestors = Object.fromEntries(arrayUniq(complexFields).map(function (f) {
      var parts = f.split(fieldSeparator);
      var ancs = Object.fromEntries(parts.slice(0, -1).map(function (f, i, parts) {
        return [].concat((0, _toConsumableArray2["default"])(parts.slice(0, i)), [f]);
      }).map(function (fp) {
        return [fp.join(fieldSeparator), (0, _configUtils.getFieldConfig)(config, fp)];
      }).filter(function (_ref3) {
        var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
            _f = _ref4[0],
            fc = _ref4[1];

        return fc.type == "!group";
      }));
      return [f, Object.keys(ancs)];
    }));
    var childrenInRuleGroup = Object.values(children).map(function (v) {
      var _v$properties2;

      return v === null || v === void 0 ? void 0 : (_v$properties2 = v.properties) === null || _v$properties2 === void 0 ? void 0 : _v$properties2.field;
    }).map(function (f) {
      return complexFieldsGroupAncestors[f];
    }).filter(function (ancs) {
      return ancs && ancs.length;
    });
    var usedRuleGroups = arrayUniq(Object.values(complexFieldsGroupAncestors).flat());
    var usedTopRuleGroups = topLevelFieldsFilter(usedRuleGroups);
    var properties = {
      conjunction: conjKey,
      not: not
    };
    var id = (0, _uuid["default"])();
    var children1 = {};
    var groupToId = {};
    Object.entries(children).map(function (_ref5) {
      var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];

      if (v.type == "group" || v.type == "rule_group") {
        // put as-is
        children1[k] = v;
      } else {
        var _v$properties3;

        var field = v === null || v === void 0 ? void 0 : (_v$properties3 = v.properties) === null || _v$properties3 === void 0 ? void 0 : _v$properties3.field;
        var groupAncestors = complexFieldsGroupAncestors[field];
        var groupField = groupAncestors === null || groupAncestors === void 0 ? void 0 : groupAncestors.at(-1);

        if (!groupField) {
          // not in rule_group (can be simple field or in struct) - put as-is
          children1[k] = v;
        } else {
          // wrap field in rule_group (with creating hierarchy if need)
          var ch = children1;
          var parentFieldParts = parentField ? parentField.split(fieldSeparator) : [];
          var isInParent = (0, _stuff.shallowEqual)(parentFieldParts, groupField.split(fieldSeparator).slice(0, parentFieldParts.length));
          if (!isInParent) parentFieldParts = []; // should not be

          var traverseGroupFields = groupField.split(fieldSeparator).slice(parentFieldParts.length).map(function (f, i, parts) {
            return [].concat((0, _toConsumableArray2["default"])(parentFieldParts), (0, _toConsumableArray2["default"])(parts.slice(0, i)), [f]).join(fieldSeparator);
          }).map(function (f) {
            return (0, _configUtils.normalizeField)(config, f);
          }).map(function (f) {
            return {
              f: f,
              fc: (0, _configUtils.getFieldConfig)(config, f) || {}
            };
          }).filter(function (_ref7) {
            var fc = _ref7.fc;
            return fc.type != "!struct";
          });
          traverseGroupFields.map(function (_ref8, i) {
            var gf = _ref8.f,
                gfc = _ref8.fc;
            var groupId = groupToId[gf];

            if (!groupId) {
              groupId = (0, _uuid["default"])();
              groupToId[gf] = groupId;
              ch[groupId] = {
                type: "rule_group",
                id: groupId,
                children1: {},
                properties: {
                  conjunction: conjKey,
                  not: false,
                  field: gf,
                  mode: gfc.mode
                }
              };
            }

            ch = ch[groupId].children1;
          });
          ch[k] = v;
        }
      }
    }); // tip: for isRuleGroup=true correct type and properties will be set out of this func

    return {
      type: type,
      id: id,
      children1: children1,
      properties: properties
    };
  }

  return undefined;
};

var topLevelFieldsFilter = function topLevelFieldsFilter(fields) {
  var arr = (0, _toConsumableArray2["default"])(fields).sort(function (a, b) {
    return a.length - b.length;
  });

  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j].indexOf(arr[i]) == 0) {
        // arr[j] is inside arr[i] (eg. "a.b" inside "a")
        arr.splice(j, 1);
        j--;
      }
    }
  }

  return arr;
};

var wrapInDefaultConjRuleGroup = function wrapInDefaultConjRuleGroup(rule, parentField, parentFieldConfig, config, conj) {
  if (!rule) return undefined;
  return {
    type: "rule_group",
    id: (0, _uuid["default"])(),
    children1: (0, _defineProperty2["default"])({}, rule.id, rule),
    properties: {
      conjunction: conj || (0, _defaultUtils.defaultGroupConjunction)(config, parentFieldConfig),
      not: false,
      field: parentField
    }
  };
};

var wrapInDefaultConj = function wrapInDefaultConj(rule, config) {
  var not = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    type: "group",
    id: (0, _uuid["default"])(),
    children1: (0, _defineProperty2["default"])({}, rule.id, rule),
    properties: {
      conjunction: (0, _defaultUtils.defaultConjunction)(config),
      not: not
    }
  };
};

var parseRule = function parseRule(op, arity, vals, parentField, conv, config, meta) {
  var errors = [];

  var res = _parseRule(op, arity, vals, parentField, conv, config, errors, false) || _parseRule(op, arity, vals, parentField, conv, config, errors, true);

  if (!res) {
    meta.errors.push(errors.join("; ") || "Unknown op ".concat(op, "/").concat(arity));
    return undefined;
  }

  return res;
};

var _parseRule = function _parseRule(op, arity, vals, parentField, conv, config, errors, isRevArgs) {
  // config.settings.groupOperators are used for group count (cardinality = 0 is exception)
  // but don't confuse with "all-in" for multiselect
  var isAllInForMultiselect = op == "all" && (0, _stuff.isJsonLogic)(vals[1]) && Object.keys(vals[1])[0] == "in";
  var isGroup0 = !isAllInForMultiselect && config.settings.groupOperators.includes(op);
  var eqOps = ["==", "!="];
  var cardinality = isGroup0 ? 0 : arity - 1;
  if (isGroup0) cardinality = 0;else if (eqOps.includes(op) && cardinality == 1 && vals[1] === null) cardinality = 0;
  var opk = op + "/" + cardinality;
  var fieldSeparator = config.settings.fieldSeparator;
  var opKeys = conv.operators[(isRevArgs ? "#" : "") + opk];
  if (!opKeys) return;
  var jlField,
      args = [];
  var rangeOps = ["<", "<=", ">", ">="];

  if (rangeOps.includes(op) && arity == 3) {
    jlField = vals[1];
    args = [vals[0], vals[2]];
  } else if (isRevArgs) {
    jlField = vals[1];
    args = [vals[0]];
  } else {
    var _vals2 = (0, _toArray2["default"])(vals);

    jlField = _vals2[0];
    args = _vals2.slice(1);
  }

  if (!(0, _stuff.isJsonLogic)(jlField)) {
    errors.push("Incorrect operands for ".concat(op, ": ").concat(JSON.stringify(vals)));
    return;
  }

  var k = Object.keys(jlField)[0];
  var v = Object.values(jlField)[0];
  var field, having, isGroup;

  if (conv.varKeys.includes(k) && typeof v == "string") {
    field = v;
  }

  if (isGroup0) {
    isGroup = true;
    having = args[0];
    args = [];
  } // reduce/filter for group ext


  if (k == "reduce" && Array.isArray(v) && v.length == 3) {
    var _v2 = v,
        _v3 = (0, _slicedToArray2["default"])(_v2, 3),
        filter = _v3[0],
        acc = _v3[1],
        init = _v3[2];

    if ((0, _stuff.isJsonLogic)(filter) && init == 0 && (0, _stuff.isJsonLogic)(acc) && Array.isArray(acc["+"]) && acc["+"][0] == 1 && (0, _stuff.isJsonLogic)(acc["+"][1]) && acc["+"][1]["var"] == "accumulator") {
      k = Object.keys(filter)[0];
      v = Object.values(filter)[0];

      if (k == "filter") {
        var _v4 = v,
            _v5 = (0, _slicedToArray2["default"])(_v4, 2),
            group = _v5[0],
            _filter = _v5[1];

        if ((0, _stuff.isJsonLogic)(group)) {
          k = Object.keys(group)[0];
          v = Object.values(group)[0];

          if (conv.varKeys.includes(k) && typeof v == "string") {
            field = v;
            having = _filter;
            isGroup = true;
          }
        }
      } else if (conv.varKeys.includes(k) && typeof v == "string") {
        field = v;
        isGroup = true;
      }
    }
  }

  if (!field) {
    errors.push("Unknown field ".concat(JSON.stringify(jlField)));
    return;
  }

  if (parentField) field = [parentField, field].join(fieldSeparator);
  field = (0, _configUtils.normalizeField)(config, field);
  var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);

  if (!fieldConfig) {
    errors.push("No config for field ".concat(field));
    return;
  }

  var opKey = opKeys[0];

  if (opKeys.length > 1 && fieldConfig && fieldConfig.operators) {
    // eg. for "equal" and "select_equals"
    opKeys = opKeys.filter(function (k) {
      return fieldConfig.operators.includes(k);
    });

    if (opKeys.length == 0) {
      errors.push("No corresponding ops for field ".concat(field));
      return;
    }

    opKey = opKeys[0];
  }

  return {
    field: field,
    fieldConfig: fieldConfig,
    opKey: opKey,
    args: args,
    having: having
  };
};

var convertOp = function convertOp(op, vals, conv, config, not, meta) {
  var parentField = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  if (!op) return undefined;
  var arity = vals.length;

  if (op == "all" && (0, _stuff.isJsonLogic)(vals[1])) {
    // special case for "all-in"
    var op2 = Object.keys(vals[1])[0];

    if (op2 == "in") {
      vals = [vals[0], vals[1][op2][1]];
      op = op + "-" + op2; // "all-in"
    }
  }

  var parseRes = parseRule(op, arity, vals, parentField, conv, config, meta);
  if (!parseRes) return undefined;
  var field = parseRes.field,
      fieldConfig = parseRes.fieldConfig,
      opKey = parseRes.opKey,
      args = parseRes.args,
      having = parseRes.having;
  var opConfig = config.operators[opKey]; // Group component in array mode can show NOT checkbox, so do nothing in this case
  // Otherwise try to revert

  var showNot = fieldConfig.showNot !== undefined ? fieldConfig.showNot : config.settings.showNot;
  var canRev = true; // if (fieldConfig.type == "!group" && fieldConfig.mode == "array" && showNot)
  //   canRev = false;

  var conj;
  var havingVals;

  if (fieldConfig.type == "!group" && having) {
    conj = Object.keys(having)[0];
    havingVals = having[conj];
    if (!Array.isArray(havingVals)) havingVals = [havingVals]; // Preprocess "!": Try to reverse op in single rule in having
    // Eg. use `not_equal` instead of `not` `equal`

    var isEmptyOp = conj == "!" && havingVals.length == 1 && havingVals[0] && (0, _stuff.isJsonLogic)(havingVals[0]) && conv.varKeys.includes(Object.keys(havingVals[0])[0]);

    if (conj == "!" && !isEmptyOp) {
      not = !not;
      having = having["!"];
      conj = Object.keys(having)[0];
      havingVals = having[conj];
      if (!Array.isArray(havingVals)) havingVals = [havingVals];
    }
  } // Use reversed op


  if (not && canRev && opConfig.reversedOp) {
    not = false;
    opKey = opConfig.reversedOp;
    opConfig = config.operators[opKey];
  }

  var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, opKey);
  var convertedArgs = args.map(function (v) {
    return convertFromLogic(v, conv, config, "val", meta, false, fieldConfig, widget, parentField);
  });

  if (convertedArgs.filter(function (v) {
    return v === undefined;
  }).length) {
    //meta.errors.push(`Undefined arg for field ${field} and op ${opKey}`);
    return undefined;
  }

  var res;

  if (fieldConfig.type == "!group" && having) {
    if (conv.conjunctions[conj] !== undefined) {
      res = convertConj(conj, havingVals, conv, config, not, meta, field, true);
      not = false; // not was applied to group
    } else {
      var _rule$properties;

      // need to be wrapped in `rule_group`
      var rule = convertOp(conj, havingVals, conv, config, not && canRev, meta, field);

      if (not && canRev && !(rule !== null && rule !== void 0 && (_rule$properties = rule.properties) !== null && _rule$properties !== void 0 && _rule$properties.not)) {
        not = false; // op was reversed in rule
      }

      res = wrapInDefaultConjRuleGroup(rule, field, fieldConfig, config, conv.conjunctions["and"]);
    }

    if (!res) return undefined;
    res.type = "rule_group";

    if (not) {
      Object.assign(res.properties, {
        not: not
      });
    }

    Object.assign(res.properties, {
      field: field,
      mode: fieldConfig.mode,
      operator: opKey
    });

    if (fieldConfig.mode == "array") {
      Object.assign(res.properties, {
        value: convertedArgs.map(function (v) {
          return v.value;
        }),
        valueSrc: convertedArgs.map(function (v) {
          return v.valueSrc;
        }),
        valueType: convertedArgs.map(function (v) {
          return v.valueType;
        })
      });
    }
  } else if (fieldConfig.type == "!group" && !having) {
    res = {
      type: "rule_group",
      id: (0, _uuid["default"])(),
      children1: {},
      properties: {
        conjunction: (0, _defaultUtils.defaultGroupConjunction)(config, fieldConfig),
        not: not,
        mode: fieldConfig.mode,
        field: field,
        operator: opKey
      }
    };

    if (fieldConfig.mode == "array") {
      Object.assign(res.properties, {
        value: convertedArgs.map(function (v) {
          return v.value;
        }),
        valueSrc: convertedArgs.map(function (v) {
          return v.valueSrc;
        }),
        valueType: convertedArgs.map(function (v) {
          return v.valueType;
        })
      });
    }
  } else {
    var asyncListValuesArr = convertedArgs.map(function (v) {
      return v.asyncListValues;
    }).filter(function (v) {
      return v != undefined;
    });
    var asyncListValues = asyncListValuesArr.length ? asyncListValuesArr[0] : undefined;
    res = {
      type: "rule",
      id: (0, _uuid["default"])(),
      properties: {
        field: field,
        operator: opKey,
        value: convertedArgs.map(function (v) {
          return v.value;
        }),
        valueSrc: convertedArgs.map(function (v) {
          return v.valueSrc;
        }),
        valueType: convertedArgs.map(function (v) {
          return v.valueType;
        }),
        asyncListValues: asyncListValues
      }
    };

    if (not) {
      //meta.errors.push(`No rev op for ${opKey}`);
      res = wrapInDefaultConj(res, config, not);
    }
  }

  return res;
};