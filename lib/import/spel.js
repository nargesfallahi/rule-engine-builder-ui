"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFromSpel = exports._loadFromSpel = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _spel2js = require("spel2js");

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _tree = require("./tree");

var _defaultUtils = require("../utils/defaultUtils");

var _stuff = require("../utils/stuff");

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var loadFromSpel = function loadFromSpel(logicTree, config) {
  return _loadFromSpel(logicTree, config, true);
};

exports.loadFromSpel = loadFromSpel;

var _loadFromSpel = function _loadFromSpel(spelStr, config) {
  var returnErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  //meta is mutable
  var meta = {
    errors: []
  };
  var extendedConfig = (0, _configUtils.extendConfig)(config);
  var conv = buildConv(extendedConfig);
  var compiledExpression;
  var convertedObj;
  var jsTree = undefined;

  try {
    var compileRes = _spel2js.SpelExpressionEvaluator.compile(spelStr);

    compiledExpression = compileRes._compiledExpression;
  } catch (e) {
    meta.errors.push(e);
  }

  if (compiledExpression) {
    _stuff.logger.debug("compiledExpression:", compiledExpression);

    convertedObj = convertCompiled(compiledExpression, meta);

    _stuff.logger.debug("convertedObj:", convertedObj, meta);

    jsTree = convertToTree(convertedObj, conv, extendedConfig, meta);

    if (jsTree && jsTree.type != "group" && jsTree.type != "switch_group") {
      jsTree = wrapInDefaultConj(jsTree, extendedConfig);
    }

    _stuff.logger.debug("jsTree:", jsTree);
  }

  var immTree = jsTree ? (0, _tree.loadTree)(jsTree) : undefined;

  if (returnErrors) {
    return [immTree, meta.errors];
  } else {
    if (meta.errors.length) console.warn("Errors while importing from SpEL:", meta.errors);
    return immTree;
  }
};

exports._loadFromSpel = _loadFromSpel;

var convertCompiled = function convertCompiled(expr, meta) {
  var parentExpr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var type = expr.getType();
  var children = expr.getChildren().map(function (child) {
    return convertCompiled(child, meta, expr);
  }); // flatize OR/AND

  if (type == "op-or" || type == "op-and") {
    children = children.reduce(function (acc, child) {
      var canFlatize = child.type == type && !child.not;
      var flat = canFlatize ? child.children : [child];
      return [].concat((0, _toConsumableArray2["default"])(acc), (0, _toConsumableArray2["default"])(flat));
    }, []);
  } // unwrap NOT


  if (type == "op-not") {
    if (children.length != 1) {
      meta.errors.push("Operator NOT should have 1 child, but got ".concat(children.length, "}"));
    }

    return _objectSpread(_objectSpread({}, children[0]), {}, {
      not: !(children[0].not || false)
    });
  }

  if (type == "compound") {
    // remove `.?[true]`
    children = children.filter(function (child) {
      var isListFix = child.type == "selection" && child.children.length == 1 && child.children[0].type == "boolean" && child.children[0].val == true;
      return !isListFix;
    }); // aggregation
    // eg. `results.?[product == 'abc'].length`

    var selection = children.find(function (child) {
      return child.type == "selection";
    });

    if (selection && selection.children.length != 1) {
      meta.errors.push("Selection should have 1 child, but got ".concat(selection.children.length));
    }

    var filter = selection ? selection.children[0] : null;
    var lastChild = children[children.length - 1];
    var isSize = lastChild.type == "method" && lastChild.val.methodName == "size" || lastChild.type == "!func" && lastChild.methodName == "size";
    var isLength = lastChild.type == "property" && lastChild.val == "length";
    var sourceParts = children.filter(function (child) {
      return child !== selection && child !== lastChild;
    });
    var source = {
      type: "compound",
      children: sourceParts
    };

    if (isSize || isLength) {
      return {
        type: "!aggr",
        filter: filter,
        source: source
      };
    } // remove `#this`, `#root`


    children = children.filter(function (child) {
      var isThis = child.type == "variable" && child.val == "this";
      var isRoot = child.type == "variable" && child.val == "root";
      return !(isThis || isRoot);
    }); // indexer

    children = children.map(function (child) {
      if (child.type == "indexer" && child.children.length == 1) {
        return {
          type: "indexer",
          val: child.children[0].val,
          itype: child.children[0].type
        };
      } else {
        return child;
      }
    }); // method

    if (lastChild.type == "method") {
      var obj = children.filter(function (child) {
        return child !== lastChild;
      });
      return {
        type: "!func",
        obj: obj,
        methodName: lastChild.val.methodName,
        args: lastChild.val.args
      };
    } // !func


    if (lastChild.type == "!func") {
      var _obj = children.filter(function (child) {
        return child !== lastChild;
      });

      return _objectSpread(_objectSpread({}, lastChild), {}, {
        obj: _obj
      });
    }
  } // getRaw || getValue


  var val;

  try {
    if (expr.getRaw) {
      // use my fork
      val = expr.getRaw();
    } else if (expr.getValue.length == 0) {
      // getValue not requires context arg -> can use
      val = expr.getValue();
    }
  } catch (e) {
    _stuff.logger.error("[spel2js] Error in getValue()", e);
  } // ternary


  if (type == "ternary") {
    val = flatizeTernary(children);
  } // convert method/function args


  if ((0, _typeof2["default"])(val) === "object" && val !== null) {
    if (val.methodName || val.functionName) {
      val.args = val.args.map(function (child) {
        return convertCompiled(child, meta, expr);
      });
    }
  } // convert list


  if (type == "list") {
    val = val.map(function (item) {
      return convertCompiled(item, meta, expr);
    }); // fix whole expression wrapped in `{}`

    if (!parentExpr && val.length == 1) {
      return val[0];
    }
  } // convert constructor


  if (type == "constructorref") {
    var qid = children.find(function (child) {
      return child.type == "qualifiedidentifier";
    });
    var cls = qid === null || qid === void 0 ? void 0 : qid.val;

    if (!cls) {
      meta.errors.push("Can't find qualifiedidentifier in constructorref children: ".concat(JSON.stringify(children)));
      return undefined;
    }

    var args = children.filter(function (child) {
      return child.type != "qualifiedidentifier";
    });
    return {
      type: "!new",
      cls: cls,
      args: args
    };
  } // convert type


  if (type == "typeref") {
    var _qid = children.find(function (child) {
      return child.type == "qualifiedidentifier";
    });

    var _cls = _qid === null || _qid === void 0 ? void 0 : _qid.val;

    if (!_cls) {
      meta.errors.push("Can't find qualifiedidentifier in typeref children: ".concat(JSON.stringify(children)));
      return undefined;
    }

    var _args = children.filter(function (child) {
      return child.type != "qualifiedidentifier";
    });

    return {
      type: "!type",
      cls: _cls
    };
  } // convert function/method


  if (type == "function" || type == "method") {
    // `foo()` is method, `#foo()` is function
    // let's use common property `methodName` and just add `isVar` for function
    var _val = val,
        functionName = _val.functionName,
        methodName = _val.methodName,
        _args2 = _val.args;
    return {
      type: "!func",
      methodName: functionName || methodName,
      isVar: type == "function",
      args: _args2
    };
  }

  return {
    type: type,
    children: children,
    val: val
  };
};

var flatizeTernary = function flatizeTernary(children) {
  var flat = [];

  function _processTernaryChildren(tern) {
    var _tern = (0, _slicedToArray2["default"])(tern, 3),
        cond = _tern[0],
        if_val = _tern[1],
        else_val = _tern[2];

    flat.push([cond, if_val]);

    if ((else_val === null || else_val === void 0 ? void 0 : else_val.type) == "ternary") {
      _processTernaryChildren(else_val.children);
    } else {
      flat.push([undefined, else_val]);
    }
  }

  _processTernaryChildren(children);

  return flat;
};

var buildConv = function buildConv(config) {
  var operators = {};

  var _loop = function _loop(opKey) {
    var opConfig = config.operators[opKey];

    if (opConfig.spelOps) {
      // examples: "==", "eq", ".contains", "matches" (can be used for starts_with, ends_with)
      opConfig.spelOps.forEach(function (spelOp) {
        var opk = spelOp; // + "/" + defaultValue(opConfig.cardinality, 1);

        if (!operators[opk]) operators[opk] = [];
        operators[opk].push(opKey);
      });
    } else if (opConfig.spelOp) {
      var opk = opConfig.spelOp; // + "/" + defaultValue(opConfig.cardinality, 1);

      if (!operators[opk]) operators[opk] = [];
      operators[opk].push(opKey);
    } else {
      _stuff.logger.log("[spel] No spelOp for operator ".concat(opKey));
    }
  };

  for (var opKey in config.operators) {
    _loop(opKey);
  }

  var conjunctions = {};

  for (var conjKey in config.conjunctions) {
    var conjunctionDefinition = config.conjunctions[conjKey];
    var ck = conjunctionDefinition.spelConj || conjKey.toLowerCase();
    conjunctions[ck] = conjKey;
  }

  var funcs = {};

  for (var funcKey in config.funcs) {
    var funcConfig = config.funcs[funcKey];
    var fk = void 0;

    if (typeof funcConfig.spelFunc == "string") {
      fk = funcConfig.spelFunc;
    }

    if (fk) {
      if (!funcs[fk]) funcs[fk] = [];
      funcs[fk].push(funcKey);
    }
  }

  return {
    operators: operators,
    conjunctions: conjunctions,
    funcs: funcs
  };
};

var convertPath = function convertPath(parts, meta) {
  var isError = false;
  var res = parts.map(function (c) {
    if (c.type == "variable" || c.type == "property" || c.type == "indexer" && c.itype == "string") {
      return c.val;
    } else {
      isError = true;
      meta.errors.push("Unexpected item in compound: ".concat(JSON.stringify(c)));
    }
  });
  return !isError ? res : undefined;
};

var convertArg = function convertArg(spel, conv, config, meta, parentSpel) {
  if (spel == undefined) return undefined;
  var fieldSeparator = config.settings.fieldSeparator;
  var literalTypes = {
    number: "number",
    string: "text",
    "boolean": "boolean",
    "null": "null" // should not be

  };
  var groupFieldParts = parentSpel !== null && parentSpel !== void 0 && parentSpel._groupField ? [parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField] : [];

  if (spel.type == "compound") {
    var _spel$children, _spel$children$;

    // complex field
    var parts = convertPath(spel.children, meta);

    if (!parts) {
      return undefined;
    }

    var fullParts = [].concat(groupFieldParts, (0, _toConsumableArray2["default"])(parts));
    var isVariable = ((_spel$children = spel.children) === null || _spel$children === void 0 ? void 0 : (_spel$children$ = _spel$children[0]) === null || _spel$children$ === void 0 ? void 0 : _spel$children$.type) == "variable";
    return {
      valueSrc: "field",
      //valueType: todo
      isVariable: isVariable,
      value: fullParts.join(fieldSeparator)
    };
  } else if (spel.type == "variable" || spel.type == "property") {
    // normal field
    var _fullParts = [].concat(groupFieldParts, [spel.val]);

    var _isVariable = spel.type == "variable";

    return {
      valueSrc: "field",
      //valueType: todo
      isVariable: _isVariable,
      value: _fullParts.join(fieldSeparator)
    };
  } else if (literalTypes[spel.type]) {
    var value = spel.val;
    var valueType = literalTypes[spel.type];

    if (parentSpel !== null && parentSpel !== void 0 && parentSpel.isUnary) {
      value = -value;
    }

    return {
      valueSrc: "value",
      valueType: valueType,
      value: value
    };
  } else if (spel.type == "list") {
    var _values$;

    var values = spel.val.map(function (v) {
      return convertArg(v, conv, config, meta, spel);
    });

    var _itemType = values.length ? (_values$ = values[0]) === null || _values$ === void 0 ? void 0 : _values$.valueType : null;

    var _value = values.map(function (v) {
      return v === null || v === void 0 ? void 0 : v.value;
    });

    var _valueType = "multiselect";
    return {
      valueSrc: "value",
      valueType: _valueType,
      value: _value
    };
  } else if (spel.type == "!func") {
    var _funcToOpMap;

    var obj = spel.obj,
        methodName = spel.methodName,
        args = spel.args,
        isVar = spel.isVar; // todo: get from conv

    var funcToOpMap = (_funcToOpMap = {}, (0, _defineProperty2["default"])(_funcToOpMap, ".contains", "like"), (0, _defineProperty2["default"])(_funcToOpMap, ".startsWith", "starts_with"), (0, _defineProperty2["default"])(_funcToOpMap, ".endsWith", "ends_with"), (0, _defineProperty2["default"])(_funcToOpMap, "$contains", "select_any_in"), _funcToOpMap);
    var convertedArgs = args.map(function (v) {
      return convertArg(v, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
        _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
      }));
    }); //todo: make dynamic: use funcToOpMap and check obj type in basic config

    if (methodName == "contains" && obj && obj[0].type == "list") {
      var convertedObj = obj.map(function (v) {
        return convertArg(v, conv, config, meta, spel);
      }); // {'yellow', 'green'}.?[true].contains(color)

      if (!(convertedArgs.length == 1 && convertedArgs[0].valueSrc == "field")) {
        meta.errors.push("Expected arg to method ".concat(methodName, " to be field but got: ").concat(JSON.stringify(convertedArgs)));
        return undefined;
      }

      var field = convertedArgs[0].value;

      if (!(convertedObj.length == 1 && convertedObj[0].valueType == "multiselect")) {
        meta.errors.push("Expected object of method ".concat(methodName, " to be inline list but got: ").concat(JSON.stringify(convertedObj)));
        return undefined;
      }

      var opKey = funcToOpMap["$" + methodName];
      var list = convertedObj[0];
      return buildRule(config, meta, field, opKey, [list]);
    } else if (funcToOpMap["." + methodName]) {
      // user.login.startsWith('gg')
      var _opKey = funcToOpMap["." + methodName];

      var _parts = convertPath(obj, meta);

      if (_parts && convertedArgs.length == 1) {
        var _fullParts2 = [].concat(groupFieldParts, (0, _toConsumableArray2["default"])(_parts));

        var _field = _fullParts2.join(fieldSeparator);

        return buildRule(config, meta, _field, _opKey, convertedArgs);
      }
    } else if (methodName == "parse" && obj && obj[0].type == "!new" && obj[0].cls.at(-1) == "SimpleDateFormat") {
      // new java.text.SimpleDateFormat('yyyy-MM-dd').parse('2022-01-15')
      var _args3 = obj[0].args.map(function (v) {
        return convertArg(v, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
          _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
        }));
      });

      if (!(_args3.length == 1 && _args3[0].valueType == "text")) {
        meta.errors.push("Expected args of ".concat(obj[0].cls.join("."), ".").concat(methodName, " to be 1 string but got: ").concat(JSON.stringify(_args3)));
        return undefined;
      }

      if (!(convertedArgs.length == 1 && convertedArgs[0].valueType == "text")) {
        meta.errors.push("Expected args of ".concat(obj[0].cls.join("."), " to be 1 string but got: ").concat(JSON.stringify(convertedArgs)));
        return undefined;
      }

      var dateFormat = _args3[0].value;
      var dateString = convertedArgs[0].value;

      var _valueType2 = dateFormat.includes(" ") ? "datetime" : "date";

      var _field2 = null; // todo

      var widget = _valueType2;
      var fieldConfig = (0, _configUtils.getFieldConfig)(config, _field2);
      var widgetConfig = config.widgets[widget || (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.mainWidget)];
      var valueFormat = widgetConfig.valueFormat;
      var dateVal = (0, _moment["default"])(dateString, _moment["default"].ISO_8601);

      var _value2 = dateVal.isValid() ? dateVal.format(valueFormat) : undefined;

      return {
        valueSrc: "value",
        valueType: _valueType2,
        value: _value2
      };
    } else if (methodName == "parse" && obj && obj[0].type == "!type" && obj[0].cls.at(-1) == "LocalTime") {
      // time == T(java.time.LocalTime).parse('02:03:00')
      if (!(convertedArgs.length == 1 && convertedArgs[0].valueType == "text")) {
        meta.errors.push("Expected args of ".concat(obj[0].cls.join("."), " to be 1 string but got: ").concat(JSON.stringify(convertedArgs)));
        return undefined;
      }

      var timeString = convertedArgs[0].value;
      var _valueType3 = "time";
      var _field3 = null; // todo

      var _widget = _valueType3;

      var _fieldConfig = (0, _configUtils.getFieldConfig)(config, _field3);

      var _widgetConfig = config.widgets[_widget || (_fieldConfig === null || _fieldConfig === void 0 ? void 0 : _fieldConfig.mainWidget)];
      var _valueFormat = _widgetConfig.valueFormat;

      var _dateVal = (0, _moment["default"])(timeString, "HH:mm:ss");

      var _value3 = _dateVal.isValid() ? _dateVal.format(_valueFormat) : undefined;

      return {
        valueSrc: "value",
        valueType: _valueType3,
        value: _value3
      };
    } else {
      // todo: conv.funcs
      meta.errors.push("Unsupported method ".concat(methodName));
    }
  } else if (spel.type == "op-plus" && (parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel.type) == "ternary") {
    return buildCaseValueConcat(spel, conv, config, meta);
  } else {
    meta.errors.push("Can't convert arg of type ".concat(spel.type));
  }

  return undefined;
};

var buildRule = function buildRule(config, meta, field, opKey, convertedArgs) {
  if (convertedArgs.filter(function (v) {
    return v === undefined;
  }).length) {
    return undefined;
  }

  var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);

  if (!fieldConfig) {
    meta.errors.push("No config for field ".concat(field));
    return undefined;
  }

  var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, opKey);
  var widgetConfig = config.widgets[widget || fieldConfig.mainWidget];
  var asyncListValuesArr = convertedArgs.map(function (v) {
    return v.asyncListValues;
  }).filter(function (v) {
    return v != undefined;
  });
  var asyncListValues = asyncListValuesArr.length ? asyncListValuesArr[0] : undefined;
  var res = {
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
        if (v.valueSrc == "value") {
          return (widgetConfig === null || widgetConfig === void 0 ? void 0 : widgetConfig.type) || (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.type) || v.valueType;
        }

        return v.valueType;
      }),
      asyncListValues: asyncListValues
    }
  };
  return res;
};

var buildRuleGroup = function buildRuleGroup(_ref, opKey, convertedArgs, config, meta) {
  var groupFilter = _ref.groupFilter,
      groupFieldValue = _ref.groupFieldValue;
  if (groupFieldValue.valueSrc != "field") throw "Bad groupFieldValue: ".concat(JSON.stringify(groupFieldValue));
  var groupField = groupFieldValue.value;
  var groupOpRule = buildRule(config, meta, groupField, opKey, convertedArgs);
  if (!groupOpRule) return undefined;
  var fieldConfig = (0, _configUtils.getFieldConfig)(config, groupField);
  var mode = fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.mode;

  var res = _objectSpread(_objectSpread({}, groupFilter || {}), {}, {
    type: "rule_group",
    properties: _objectSpread(_objectSpread(_objectSpread({}, groupOpRule.properties), (groupFilter === null || groupFilter === void 0 ? void 0 : groupFilter.properties) || {}), {}, {
      mode: mode
    })
  });

  if (!res.id) res.id = (0, _uuid["default"])();
  return res;
};

var compareArgs = function compareArgs(left, right, spel, conv, config, meta) {
  var parentSpel = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

  if (left.type == right.type) {
    if (left.type == "!aggr") {
      var _map = [left.source, right.source].map(function (v) {
        return convertArg(v, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
          _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
        }));
      }),
          _map2 = (0, _slicedToArray2["default"])(_map, 2),
          leftSource = _map2[0],
          rightSource = _map2[1]; //todo: check same filter


      return leftSource.value == rightSource.value;
    } else {
      var _map3 = [left, right].map(function (v) {
        return convertArg(v, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
          _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
        }));
      }),
          _map4 = (0, _slicedToArray2["default"])(_map3, 2),
          leftVal = _map4[0],
          rightVal = _map4[1];

      return leftVal.value == rightVal.value;
    }
  }

  return false;
};

var convertToTree = function convertToTree(spel, conv, config, meta) {
  var parentSpel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  if (!spel) return undefined;
  var res;

  if (spel.type.indexOf("op-") == 0) {
    var op = spel.type.slice("op-".length); // unary

    var isUnary = (op == "minus" || op == "plus") && spel.children.length == 1;

    if (isUnary) {
      spel.isUnary = true;
      return convertToTree(spel.children[0], conv, config, meta, spel);
    } // between


    var isBetweenNormal = op == "and" && spel.children.length == 2 && spel.children[0].type == "op-ge" && spel.children[1].type == "op-le";
    var isBetweenRev = op == "or" && spel.children.length == 2 && spel.children[0].type == "op-lt" && spel.children[1].type == "op-gt";
    var isBetween = isBetweenNormal || isBetweenRev;

    if (isBetween) {
      var _spel$children$0$chil = (0, _slicedToArray2["default"])(spel.children[0].children, 2),
          left = _spel$children$0$chil[0],
          from = _spel$children$0$chil[1];

      var _spel$children$1$chil = (0, _slicedToArray2["default"])(spel.children[1].children, 2),
          right = _spel$children$1$chil[0],
          to = _spel$children$1$chil[1];

      var isNumbers = from.type == "number" && to.type == "number";
      var isSameSource = compareArgs(left, right, spel, conv, config, meta, parentSpel);

      if (isNumbers && isSameSource) {
        var _fromValue = from.val;
        var _toValue = to.val;
        var oneSpel = {
          type: "op-between",
          children: [left, from, to]
        };
        return convertToTree(oneSpel, conv, config, meta, parentSpel);
      }
    } // find op


    var opKeys = conv.operators[op];
    var opKey; // todo: make dynamic, use basic config

    if (op == "eq" && spel.children[1].type == "null") {
      opKey = "is_null";
    } else if (op == "ne" && spel.children[1].type == "null") {
      opKey = "is_not_null";
    } else if (op == "le" && spel.children[1].type == "string" && spel.children[1].val == "") {
      opKey = "is_empty";
    } else if (op == "gt" && spel.children[1].type == "string" && spel.children[1].val == "") {
      opKey = "is_not_empty";
    } else if (op == "between") {
      opKey = "between";
      opKeys = ["between"];
    } // convert children


    var convertChildren = function convertChildren() {
      return spel.children.map(function (child) {
        return convertToTree(child, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
          _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
        }));
      });
    };

    if (op == "and" || op == "or") {
      var children1 = {};
      var vals = convertChildren();
      vals.forEach(function (v) {
        if (v) {
          var id = (0, _uuid["default"])();
          v.id = id;

          if (v.type != undefined) {
            children1[id] = v;
          } else {
            meta.errors.push("Bad item in AND/OR: ".concat(JSON.stringify(v)));
          }
        }
      });
      res = {
        type: "group",
        id: (0, _uuid["default"])(),
        children1: children1,
        properties: {
          conjunction: conv.conjunctions[op],
          not: spel.not
        }
      };
    } else if (opKeys) {
      var _vals = convertChildren();

      var fieldObj = _vals[0];

      var convertedArgs = _vals.slice(1);

      opKey = opKeys[0];

      if (!fieldObj) {// LHS can't be parsed
      } else if (fieldObj.groupFieldValue) {
        // 1. group
        if (fieldObj.groupFieldValue.valueSrc != "field") {
          meta.errors.push("Expected group field ".concat(JSON.stringify(fieldObj)));
        }

        var groupField = fieldObj.groupFieldValue.value; // some/all/none

        var opArg = convertedArgs[0];

        if (opArg && opArg.groupFieldValue && opArg.groupFieldValue.valueSrc == "field" && opArg.groupFieldValue.value == groupField) {
          // group.?[...].size() == group.size()
          opKey = "all";
          convertedArgs = [];
        } else if (opKey == "equal" && opArg.valueSrc == "value" && opArg.valueType == "number" && opArg.value == 0) {
          opKey = "none";
          convertedArgs = [];
        } else if (opKey == "greater" && opArg.valueSrc == "value" && opArg.valueType == "number" && opArg.value == 0) {
          opKey = "some";
          convertedArgs = [];
        }

        res = buildRuleGroup(fieldObj, opKey, convertedArgs, config, meta);
      } else {
        // 2. not group
        if (fieldObj.valueSrc != "field") {
          meta.errors.push("Expected field ".concat(JSON.stringify(fieldObj)));
        }

        var field = fieldObj.value;

        if (opKeys.length > 1) {
          _stuff.logger.warn("[spel] Spel operator ".concat(op, " can be mapped to ").concat(opKeys)); //todo: it's naive


          var widgets = opKeys.map(function (op) {
            return {
              op: op,
              widget: (0, _ruleUtils.getWidgetForFieldOp)(config, field, op)
            };
          });

          if (op == "eq") {
            var ws = widgets.find(function (_ref2) {
              var op = _ref2.op,
                  widget = _ref2.widget;
              return widget != "field";
            });
            opKey = ws.op;
          }
        }

        res = buildRule(config, meta, field, opKey, convertedArgs);
      }
    } else {
      if (!parentSpel) {
        // try to parse whole `"str" + prop + #var` as ternary
        res = buildSimpleSwitch(spel, conv, config, meta);
      }

      if (!res) {
        meta.errors.push("Can't convert op ".concat(op));
      }
    }
  } else if (spel.type == "!aggr") {
    var _groupFilter;

    var groupFieldValue = convertToTree(spel.source, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
      _groupField: parentSpel === null || parentSpel === void 0 ? void 0 : parentSpel._groupField
    }));
    var groupFilter = convertToTree(spel.filter, conv, config, meta, _objectSpread(_objectSpread({}, spel), {}, {
      _groupField: groupFieldValue === null || groupFieldValue === void 0 ? void 0 : groupFieldValue.value
    }));

    if (((_groupFilter = groupFilter) === null || _groupFilter === void 0 ? void 0 : _groupFilter.type) == "rule") {
      groupFilter = wrapInDefaultConj(groupFilter, config);
    }

    res = {
      groupFilter: groupFilter,
      groupFieldValue: groupFieldValue
    };

    if (!parentSpel) {
      // !aggr can't be in root, it should be compared with something
      res = undefined;
      meta.errors.push("Unexpected !aggr in root");
    }
  } else if (spel.type == "ternary") {
    var _children = {};
    spel.val.forEach(function (v) {
      var _v = (0, _slicedToArray2["default"])(v, 2),
          cond = _v[0],
          val = _v[1];

      var caseI = buildCase(cond, val, conv, config, meta, spel);

      if (caseI) {
        _children[caseI.id] = caseI;
      }
    });
    res = {
      type: "switch_group",
      id: (0, _uuid["default"])(),
      children1: _children,
      properties: {}
    };
  } else {
    res = convertArg(spel, conv, config, meta, parentSpel);

    if (res && !res.type && !parentSpel) {
      // try to parse whole `"1"` as ternary
      var sw = buildSimpleSwitch(spel, conv, config, meta);

      if (sw) {
        res = sw;
      } else {
        res = undefined;
        meta.errors.push("Can't convert rule of type ".concat(spel.type, ", it looks like var/literal"));
      }
    }
  }

  return res;
};

var buildSimpleSwitch = function buildSimpleSwitch(val, conv, config, meta) {
  var children1 = {};
  var cond = null;
  var caseI = buildCase(cond, val, conv, config, meta);

  if (caseI) {
    children1[caseI.id] = caseI;
  }

  var res = {
    type: "switch_group",
    id: (0, _uuid["default"])(),
    children1: children1,
    properties: {}
  };
  return res;
};

var buildCase = function buildCase(cond, val, conv, config, meta) {
  var spel = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var valProperties = buildCaseValProperties(config, meta, conv, val, spel);
  var caseI;

  if (cond) {
    caseI = convertToTree(cond, conv, config, meta, spel);

    if (caseI && caseI.type) {
      if (caseI.type != "group") {
        caseI = wrapInDefaultConj(caseI, config);
      }

      caseI.type = "case_group";
    } else {
      meta.errors.push("Unexpected case: ".concat(JSON.stringify(caseI)));
      caseI = undefined;
    }
  } else {
    caseI = {
      id: (0, _uuid["default"])(),
      type: "case_group",
      properties: {}
    };
  }

  if (caseI) {
    caseI.properties = _objectSpread(_objectSpread({}, caseI.properties), valProperties);
  }

  return caseI;
};

var buildCaseValueConcat = function buildCaseValueConcat(spel, conv, config, meta) {
  var flat = [];

  function _processConcatChildren(children) {
    children.map(function (child) {
      if (child.type == "op-plus") {
        _processConcatChildren(child.children);
      } else {
        var convertedChild = convertArg(child, conv, config, meta, spel);

        if (convertedChild) {
          flat.push(convertedChild);
        } else {
          meta.errors.push("Can't convert ".concat(child.type, " in concatenation"));
        }
      }
    });
  }

  _processConcatChildren(spel.children);

  return {
    valueSrc: "value",
    valueType: "case_value",
    value: flat
  };
};

var buildCaseValProperties = function buildCaseValProperties(config, meta, conv, val) {
  var spel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var valProperties = {};
  var convVal;

  if ((val === null || val === void 0 ? void 0 : val.type) == "op-plus") {
    convVal = buildCaseValueConcat(val, conv, config, meta);
  } else {
    convVal = convertArg(val, conv, config, meta, spel);
  }

  var widgetDef = config.widgets["case_value"];
  var importCaseValue = widgetDef === null || widgetDef === void 0 ? void 0 : widgetDef.spelImportValue;

  if (importCaseValue) {
    var _importCaseValue = importCaseValue(convVal),
        _importCaseValue2 = (0, _slicedToArray2["default"])(_importCaseValue, 2),
        normVal = _importCaseValue2[0],
        normErrors = _importCaseValue2[1];

    normErrors.map(function (e) {
      return meta.errors.push(e);
    });

    if (normVal) {
      valProperties = {
        value: [normVal],
        valueSrc: ["value"],
        valueType: ["case_value"]
      };
    }
  } else {
    meta.errors.push("No fucntion to import case value");
  }

  return valProperties;
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