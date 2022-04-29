"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyForDisplay = exports.mongoFormatOp2 = exports.mongoFormatOp1 = exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var Widgets = _interopRequireWildcard(require("../components/widgets"));

var Operators = _interopRequireWildcard(require("../components/operators"));

var _export = require("../utils/export");

var _stuff = require("../utils/stuff");

var _moment = _interopRequireDefault(require("moment"));

var _default2 = require("../config/default");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var VanillaBooleanWidget = Widgets.VanillaBooleanWidget,
    VanillaTextWidget = Widgets.VanillaTextWidget,
    VanillaTextAreaWidget = Widgets.VanillaTextAreaWidget,
    VanillaDateWidget = Widgets.VanillaDateWidget,
    VanillaTimeWidget = Widgets.VanillaTimeWidget,
    VanillaDateTimeWidget = Widgets.VanillaDateTimeWidget,
    VanillaMultiSelectWidget = Widgets.VanillaMultiSelectWidget,
    VanillaSelectWidget = Widgets.VanillaSelectWidget,
    VanillaNumberWidget = Widgets.VanillaNumberWidget,
    VanillaSliderWidget = Widgets.VanillaSliderWidget,
    ValueFieldWidget = Widgets.ValueFieldWidget,
    FuncWidget = Widgets.FuncWidget;
var ProximityOperator = Operators.ProximityOperator; //----------------------------  conjunctions

var conjunctions = {
  AND: {
    label: "And",
    mongoConj: "$and",
    jsonLogicConj: "and",
    sqlConj: "AND",
    spelConj: "and",
    spelConjs: ["and", "&&"],
    reversedConj: "OR",
    formatConj: function formatConj(children, conj, not, isForDisplay) {
      return children.size > 1 ? (not ? "NOT " : "") + "(" + children.join(" " + (isForDisplay ? "AND" : "&&") + " ") + ")" : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    sqlFormatConj: function sqlFormatConj(children, conj, not) {
      return children.size > 1 ? (not ? "NOT " : "") + "(" + children.join(" " + "AND" + " ") + ")" : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    spelFormatConj: function spelFormatConj(children, conj, not, omitBrackets) {
      if (not) omitBrackets = false;
      return children.size > 1 ? (not ? "!" : "") + (omitBrackets ? "" : "(") + children.join(" " + "&&" + " ") + (omitBrackets ? "" : ")") : (not ? "!(" : "") + children.first() + (not ? ")" : "");
    }
  },
  OR: {
    label: "Or",
    mongoConj: "$or",
    jsonLogicConj: "or",
    sqlConj: "OR",
    spelConj: "or",
    spelConjs: ["or", "||"],
    reversedConj: "AND",
    formatConj: function formatConj(children, conj, not, isForDisplay) {
      return children.size > 1 ? (not ? "NOT " : "") + "(" + children.join(" " + (isForDisplay ? "OR" : "||") + " ") + ")" : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    sqlFormatConj: function sqlFormatConj(children, conj, not) {
      return children.size > 1 ? (not ? "NOT " : "") + "(" + children.join(" " + "OR" + " ") + ")" : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
    },
    spelFormatConj: function spelFormatConj(children, conj, not, omitBrackets) {
      if (not) omitBrackets = false;
      return children.size > 1 ? (not ? "!" : "") + (omitBrackets ? "" : "(") + children.join(" " + "||" + " ") + (omitBrackets ? "" : ")") : (not ? "!(" : "") + children.first() + (not ? ")" : "");
    }
  }
}; //----------------------------  operators
// helpers for mongo format

var mongoFormatOp1 = function mongoFormatOp1(mop, mc, not, field, _op, value, useExpr, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
  var $field = typeof field == "string" && !field.startsWith("$") ? "$" + field : field;
  var mv = mc(value, fieldDef);
  if (mv === undefined) return undefined;

  if (not) {
    if (!useExpr && (!mop || mop == "$eq")) return (0, _defineProperty2["default"])({}, field, {
      "$ne": mv
    }); // short form

    return !useExpr ? (0, _defineProperty2["default"])({}, field, {
      "$not": (0, _defineProperty2["default"])({}, mop, mv)
    }) : {
      "$not": (0, _defineProperty2["default"])({}, mop, [$field, mv])
    };
  } else {
    if (!useExpr && (!mop || mop == "$eq")) return (0, _defineProperty2["default"])({}, field, mv); // short form

    return !useExpr ? (0, _defineProperty2["default"])({}, field, (0, _defineProperty2["default"])({}, mop, mv)) : (0, _defineProperty2["default"])({}, mop, [$field, mv]);
  }
};

exports.mongoFormatOp1 = mongoFormatOp1;

var mongoFormatOp2 = function mongoFormatOp2(mops, not, field, _op, values, useExpr, valueSrcs, valueTypes, opDef, operatorOptions, fieldDef) {
  var $field = typeof field == "string" && !field.startsWith("$") ? "$" + field : field;

  if (not) {
    var _$not3;

    return !useExpr ? (0, _defineProperty2["default"])({}, field, {
      "$not": (_$not3 = {}, (0, _defineProperty2["default"])(_$not3, mops[0], values[0]), (0, _defineProperty2["default"])(_$not3, mops[1], values[1]), _$not3)
    }) : {
      "$not": {
        "$and": [(0, _defineProperty2["default"])({}, mops[0], [$field, values[0]]), (0, _defineProperty2["default"])({}, mops[1], [$field, values[1]])]
      }
    };
  } else {
    var _field2;

    return !useExpr ? (0, _defineProperty2["default"])({}, field, (_field2 = {}, (0, _defineProperty2["default"])(_field2, mops[0], values[0]), (0, _defineProperty2["default"])(_field2, mops[1], values[1]), _field2)) : {
      "$and": [(0, _defineProperty2["default"])({}, mops[0], [$field, values[0]]), (0, _defineProperty2["default"])({}, mops[1], [$field, values[1]])]
    };
  }
};

exports.mongoFormatOp2 = mongoFormatOp2;
var operators = {
  equal: {
    label: "==",
    labelForFormat: "==",
    sqlOp: "=",
    spelOp: "==",
    spelOps: ["==", "eq"],
    reversedOp: "not_equal",
    formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
      var opStr = isForDisplay ? "=" : opDef.label;
      if (valueTypes == "boolean" && isForDisplay) return value == "No" ? "NOT ".concat(field) : "".concat(field);else return "".concat(field, " ").concat(opStr, " ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return v;
    }, false),
    jsonLogic: "==",
    elasticSearchQueryType: "term"
  },
  not_equal: {
    isNotOp: true,
    label: "!=",
    labelForFormat: "!=",
    sqlOp: "<>",
    spelOp: "!=",
    spelOps: ["!=", "ne"],
    reversedOp: "equal",
    formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
      if (valueTypes == "boolean" && isForDisplay) return value == "No" ? "".concat(field) : "NOT ".concat(field);else return "".concat(field, " ").concat(opDef.label, " ").concat(value);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
      return v;
    }, false),
    jsonLogic: "!="
  },
  less: {
    label: "<",
    labelForFormat: "<",
    sqlOp: "<",
    spelOp: "<",
    spelOps: ["<", "lt"],
    reversedOp: "greater_or_equal",
    mongoFormatOp: mongoFormatOp1.bind(null, "$lt", function (v) {
      return v;
    }, false),
    jsonLogic: "<",
    elasticSearchQueryType: "range"
  },
  less_or_equal: {
    label: "<=",
    labelForFormat: "<=",
    sqlOp: "<=",
    spelOp: "<=",
    spelOps: ["<=", "le"],
    reversedOp: "greater",
    mongoFormatOp: mongoFormatOp1.bind(null, "$lte", function (v) {
      return v;
    }, false),
    jsonLogic: "<=",
    elasticSearchQueryType: "range"
  },
  greater: {
    label: ">",
    labelForFormat: ">",
    sqlOp: ">",
    spelOp: ">",
    spelOps: [">", "gt"],
    reversedOp: "less_or_equal",
    mongoFormatOp: mongoFormatOp1.bind(null, "$gt", function (v) {
      return v;
    }, false),
    jsonLogic: ">",
    elasticSearchQueryType: "range"
  },
  greater_or_equal: {
    label: ">=",
    labelForFormat: ">=",
    sqlOp: ">=",
    spelOp: ">=",
    spelOps: [">=", "ge"],
    reversedOp: "less",
    mongoFormatOp: mongoFormatOp1.bind(null, "$gte", function (v) {
      return v;
    }, false),
    jsonLogic: ">=",
    elasticSearchQueryType: "range"
  },
  like: {
    label: "Contains",
    labelForFormat: "Contains",
    reversedOp: "not_like",
    sqlOp: "LIKE",
    spelOp: ".contains",
    spelOps: ["matches", ".contains"],
    mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
      return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) : undefined;
    }, false),
    //jsonLogic: (field, op, val) => ({ "in": [val, field] }),
    jsonLogic: "in",
    _jsonLogicIsRevArgs: true,
    valueSources: ["value"],
    elasticSearchQueryType: "regexp"
  },
  not_like: {
    isNotOp: true,
    label: "Not contains",
    reversedOp: "like",
    labelForFormat: "Not Contains",
    sqlOp: "NOT LIKE",
    mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
      return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) : undefined;
    }, true),
    valueSources: ["value"]
  },
  starts_with: {
    label: "Starts with",
    labelForFormat: "Starts with",
    sqlOp: "LIKE",
    spelOp: ".startsWith",
    spelOps: ["matches", ".startsWith"],
    mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
      return typeof v == "string" ? "^" + (0, _stuff.escapeRegExp)(v) : undefined;
    }, false),
    jsonLogic: undefined,
    // not supported
    valueSources: ["value"]
  },
  ends_with: {
    label: "Ends with",
    labelForFormat: "Ends with",
    sqlOp: "LIKE",
    spelOp: ".endsWith",
    spelOps: ["matches", ".endsWith"],
    mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
      return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) + "$" : undefined;
    }, false),
    jsonLogic: undefined,
    // not supported
    valueSources: ["value"]
  },
  between: {
    label: "Between",
    labelForFormat: "BETWEEN",
    sqlOp: "BETWEEN",
    cardinality: 2,
    formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
      var valFrom = values.first();
      var valTo = values.get(1);
      if (isForDisplay) return "".concat(field, " BETWEEN ").concat(valFrom, " AND ").concat(valTo);else return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      var valFrom = values[0];
      var valTo = values[1];
      return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
    },
    mongoFormatOp: mongoFormatOp2.bind(null, ["$gte", "$lte"], false),
    valueLabels: ["Value from", "Value to"],
    textSeparators: [null, "and"],
    reversedOp: "not_between",
    jsonLogic: "<=",
    validateValues: function validateValues(values) {
      if (values[0] != undefined && values[1] != undefined) {
        return values[0] <= values[1] ? null : "Invalid range";
      }

      return null;
    },
    elasticSearchQueryType: function elasticSearchQueryType(type) {
      return type === "time" ? "filter" : "range";
    }
  },
  not_between: {
    isNotOp: true,
    label: "Not between",
    labelForFormat: "NOT BETWEEN",
    sqlOp: "NOT BETWEEN",
    cardinality: 2,
    formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
      var valFrom = values.first();
      var valTo = values.get(1);
      if (isForDisplay) return "".concat(field, " NOT BETWEEN ").concat(valFrom, " AND ").concat(valTo);else return "(".concat(field, " < ").concat(valFrom, " || ").concat(field, " > ").concat(valTo, ")");
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      var valFrom = values[0];
      var valTo = values[1];
      return "(".concat(field, " < ").concat(valFrom, " || ").concat(field, " > ").concat(valTo, ")");
    },
    mongoFormatOp: mongoFormatOp2.bind(null, ["$gte", "$lte"], true),
    valueLabels: ["Value from", "Value to"],
    textSeparators: [null, "and"],
    reversedOp: "between",
    validateValues: function validateValues(values) {
      if (values[0] != undefined && values[1] != undefined) {
        return values[0] <= values[1] ? null : "Invalid range";
      }

      return null;
    }
  },
  is_empty: {
    label: "Is empty",
    labelForFormat: "IS EMPTY",
    cardinality: 0,
    reversedOp: "is_not_empty",
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS EMPTY") : "!".concat(field);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      var empty = (0, _export.sqlEmptyValue)(fieldDef);
      return "COALESCE(".concat(field, ", ").concat(empty, ") = ").concat(empty);
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      //tip: is empty or null
      return "".concat(field, " <= ''");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$in", function (v, fieldDef) {
      return [(0, _export.mongoEmptyValue)(fieldDef), null];
    }, false),
    jsonLogic: "!"
  },
  is_not_empty: {
    isNotOp: true,
    label: "Is not empty",
    labelForFormat: "IS NOT EMPTY",
    cardinality: 0,
    reversedOp: "is_empty",
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS NOT EMPTY") : "!!".concat(field);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      var empty = (0, _export.sqlEmptyValue)(fieldDef);
      return "COALESCE(".concat(field, ", ").concat(empty, ") <> ").concat(empty);
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      //tip: is not empty and not null
      return "".concat(field, " > ''");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$nin", function (v, fieldDef) {
      return [(0, _export.mongoEmptyValue)(fieldDef), null];
    }, false),
    jsonLogic: "!!",
    elasticSearchQueryType: "exists"
  },
  is_null: {
    label: "Is null",
    labelForFormat: "IS NULL",
    sqlOp: "IS NULL",
    cardinality: 0,
    reversedOp: "is_not_null",
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS NULL") : "!".concat(field);
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      return "".concat(field, " == null");
    },
    // check if value is null OR not exists
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return null;
    }, false),
    jsonLogic: "=="
  },
  is_not_null: {
    label: "Is not null",
    labelForFormat: "IS NOT NULL",
    sqlOp: "IS NOT NULL",
    cardinality: 0,
    reversedOp: "is_null",
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return isForDisplay ? "".concat(field, " IS NOT NULL") : "!!".concat(field);
    },
    spelFormatOp: function spelFormatOp(field, op, values, valueSrc, valueTypes, opDef, operatorOptions, fieldDef) {
      return "".concat(field, " != null");
    },
    // check if value exists and is not null
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
      return null;
    }, false),
    jsonLogic: "!=",
    elasticSearchQueryType: "exists"
  },
  select_equals: {
    label: "==",
    labelForFormat: "==",
    sqlOp: "=",
    // enum/set
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      var opStr = isForDisplay ? "=" : "==";
      return "".concat(field, " ").concat(opStr, " ").concat(value);
    },
    spelOp: "==",
    spelOps: ["==", "eq"],
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return v;
    }, false),
    reversedOp: "select_not_equals",
    jsonLogic: "==",
    elasticSearchQueryType: "term"
  },
  select_not_equals: {
    isNotOp: true,
    label: "!=",
    labelForFormat: "!=",
    sqlOp: "<>",
    // enum/set
    formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      return "".concat(field, " != ").concat(value);
    },
    spelOp: "!=",
    spelOps: ["!=", "ne"],
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
      return v;
    }, false),
    reversedOp: "select_equals",
    jsonLogic: "!="
  },
  select_any_in: {
    label: "Any in",
    labelForFormat: "IN",
    sqlOp: "IN",
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == "value") return "".concat(field, " IN (").concat(values.join(", "), ")");else return "".concat(field, " IN (").concat(values, ")");
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (valueSrc == "value") {
        return "".concat(field, " IN (").concat(values.join(", "), ")");
      } else return undefined; // not supported

    },
    spelOp: "$contains",
    // tip: $ means first arg is object
    mongoFormatOp: mongoFormatOp1.bind(null, "$in", function (v) {
      return v;
    }, false),
    reversedOp: "select_not_any_in",
    jsonLogic: "in",
    elasticSearchQueryType: "term"
  },
  select_not_any_in: {
    isNotOp: true,
    label: "Not in",
    labelForFormat: "NOT IN",
    sqlOp: "NOT IN",
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == "value") return "".concat(field, " NOT IN (").concat(values.join(", "), ")");else return "".concat(field, " NOT IN (").concat(values, ")");
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (valueSrc == "value") {
        return "".concat(field, " NOT IN (").concat(values.join(", "), ")");
      } else return undefined; // not supported

    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$nin", function (v) {
      return v;
    }, false),
    reversedOp: "select_any_in"
  },
  //todo: multiselect_contains - for SpEL it would be `.containsAll`
  multiselect_equals: {
    label: "Equals",
    labelForFormat: "==",
    sqlOp: "=",
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      var opStr = isForDisplay ? "=" : "==";
      if (valueSrc == "value") return "".concat(field, " ").concat(opStr, " [").concat(values.join(", "), "]");else return "".concat(field, " ").concat(opStr, " ").concat(values);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (valueSrc == "value") // set
        return "".concat(field, " = '").concat(values.map(function (v) {
          return _export.SqlString.trim(v);
        }).join(","), "'");else return undefined; //not supported
    },
    spelOp: ".equals",
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return v;
    }, false),
    reversedOp: "multiselect_not_equals",
    jsonLogic2: "all-in",
    jsonLogic: function jsonLogic(field, op, vals) {
      return {
        // it's not "equals", but "includes" operator - just for example
        "all": [field, {
          "in": [{
            "var": ""
          }, vals]
        }]
      };
    },
    elasticSearchQueryType: "term"
  },
  multiselect_not_equals: {
    isNotOp: true,
    label: "Not equals",
    labelForFormat: "!=",
    sqlOp: "<>",
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      if (valueSrc == "value") return "".concat(field, " != [").concat(values.join(", "), "]");else return "".concat(field, " != ").concat(values);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (valueSrc == "value") // set
        return "".concat(field, " != '").concat(values.map(function (v) {
          return _export.SqlString.trim(v);
        }).join(","), "'");else return undefined; //not supported
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
      return v;
    }, false),
    reversedOp: "multiselect_equals"
  },
  proximity: {
    label: "Proximity search",
    cardinality: 2,
    valueLabels: [{
      label: "Word 1",
      placeholder: "Enter first word"
    }, {
      label: "Word 2",
      placeholder: "Enter second word"
    }],
    textSeparators: [//'Word 1',
      //'Word 2'
    ],
    formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      var val1 = values.first();
      var val2 = values.get(1);
      var prox = operatorOptions.get("proximity");
      return "".concat(field, " ").concat(val1, " NEAR/").concat(prox, " ").concat(val2);
    },
    sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      var val1 = values.first();
      var val2 = values.get(1);

      var aVal1 = _export.SqlString.trim(val1);

      var aVal2 = _export.SqlString.trim(val2);

      var prox = operatorOptions.get("proximity");
      return "CONTAINS(".concat(field, ", 'NEAR((").concat(aVal1, ", ").concat(aVal2, "), ").concat(prox, ")')");
    },
    mongoFormatOp: undefined,
    // not supported
    jsonLogic: undefined,
    // not supported
    options: {
      optionLabel: "Near",
      // label on top of "near" selectbox (for config.settings.showLabels==true)
      optionTextBefore: "Near",
      // label before "near" selectbox (for config.settings.showLabels==false)
      optionPlaceholder: "Select words between",
      // placeholder for "near" selectbox
      factory: function factory(props) {
        return /*#__PURE__*/_react["default"].createElement(ProximityOperator, props);
      },
      minProximity: 2,
      maxProximity: 10,
      defaults: {
        proximity: 2
      }
    }
  },
  some: {
    label: "Some",
    labelForFormat: "SOME",
    cardinality: 0,
    jsonLogic: "some",
    spelFormatOp: function spelFormatOp(filteredSize) {
      return "".concat(filteredSize, " > 0");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$gt", function (v) {
      return 0;
    }, false)
  },
  all: {
    label: "All",
    labelForFormat: "ALL",
    cardinality: 0,
    jsonLogic: "all",
    spelFormatOp: function spelFormatOp(filteredSize, op, fullSize) {
      return "".concat(filteredSize, " == ").concat(fullSize);
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return v;
    }, false)
  },
  none: {
    label: "None",
    labelForFormat: "NONE",
    cardinality: 0,
    jsonLogic: "none",
    spelFormatOp: function spelFormatOp(filteredSize) {
      return "".concat(filteredSize, " == 0");
    },
    mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
      return 0;
    }, false)
  }
}; //----------------------------  widgets

var stringifyForDisplay = function stringifyForDisplay(v) {
  return v == null ? "NULL" : v.toString();
};

exports.stringifyForDisplay = stringifyForDisplay;
var widgets = {
  text: {
    type: "text",
    jsType: "string",
    valueSrc: "value",
    valueLabel: "String",
    valuePlaceholder: "Enter string",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaTextWidget, props);
    },
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? stringifyForDisplay(val) : JSON.stringify(val);
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      if (opDef.spelOp == "matches" && op != "regex") {
        var regex;

        if (op == "starts_with") {
          regex = "(?s)^".concat((0, _stuff.escapeRegExp)(val), ".*");
        } else if (op == "ends_with") {
          regex = "(?s).*".concat((0, _stuff.escapeRegExp)(val), "$");
        } else {
          // op == 'like'
          regex = "(?s).*".concat((0, _stuff.escapeRegExp)(val), ".*"); //tip: can use (?sui) for case-insensitive
        }

        return (0, _export.spelEscape)(regex);
      } else {
        return (0, _export.spelEscape)(val);
      }
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      if (opDef.sqlOp == "LIKE" || opDef.sqlOp == "NOT LIKE") {
        return _export.SqlString.escapeLike(val, op != "starts_with", op != "ends_with");
      } else {
        return _export.SqlString.escape(val);
      }
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  textarea: {
    type: "text",
    jsType: "string",
    valueSrc: "value",
    valueLabel: "Text",
    valuePlaceholder: "Enter text",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaTextAreaWidget, props);
    },
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? stringifyForDisplay(val) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      if (opDef.sqlOp == "LIKE" || opDef.sqlOp == "NOT LIKE") {
        return _export.SqlString.escapeLike(val, op != "starts_with", op != "ends_with");
      } else {
        return _export.SqlString.escape(val);
      }
    },
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    },
    fullWidth: true
  },
  number: {
    type: "number",
    jsType: "number",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaNumberWidget, props);
    },
    valueLabel: "Number",
    valuePlaceholder: "Enter number",
    valueLabels: [{
      label: "Number from",
      placeholder: "Enter number from"
    }, {
      label: "Number to",
      placeholder: "Enter number to"
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? stringifyForDisplay(val) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef) {
      var isFloat = wgtDef.step && !Number.isInteger(wgtDef.step);
      return (0, _export.spelEscape)(val, isFloat);
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  slider: {
    type: "number",
    jsType: "number",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaSliderWidget, props);
    },
    valueLabel: "Number",
    valuePlaceholder: "Enter number or move slider",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? stringifyForDisplay(val) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  select: {
    type: "select",
    jsType: "string",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaSelectWidget, props);
    },
    valueLabel: "Value",
    valuePlaceholder: "Select value",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var valLabel = (0, _stuff.getTitleInListValues)(fieldDef.fieldSettings.listValues || fieldDef.asyncListValues, val);
      return isForDisplay ? stringifyForDisplay(valLabel) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  multiselect: {
    type: "multiselect",
    jsType: "array",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaMultiSelectWidget, props);
    },
    valueLabel: "Values",
    valuePlaceholder: "Select values",
    formatValue: function formatValue(vals, fieldDef, wgtDef, isForDisplay) {
      var valsLabels = vals.map(function (v) {
        return (0, _stuff.getTitleInListValues)(fieldDef.fieldSettings.listValues || fieldDef.asyncListValues, v);
      });
      return isForDisplay ? valsLabels.map(stringifyForDisplay) : vals.map(JSON.stringify);
    },
    sqlFormatValue: function sqlFormatValue(vals, fieldDef, wgtDef, op, opDef) {
      return vals.map(function (v) {
        return _export.SqlString.escape(v);
      });
    },
    spelFormatValue: function spelFormatValue(vals, fieldDef, wgtDef, op, opDef) {
      var isCallable = opDef.spelOp && opDef.spelOp[0] == "$";
      var res = (0, _export.spelEscape)(vals); // inline list

      if (isCallable) {
        // `{1,2}.contains(1)` NOT works
        // `{1,2}.?[true].contains(1)` works
        res = (0, _export.spelFixList)(res);
      }

      return res;
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  date: {
    type: "date",
    jsType: "string",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaDateWidget, props);
    },
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
    useKeyboard: true,
    valueLabel: "Date",
    valuePlaceholder: "Enter date",
    valueLabels: [{
      label: "Date from",
      placeholder: "Enter date from"
    }, {
      label: "Date to",
      placeholder: "Enter date to"
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? dateVal.format(wgtDef.dateFormat) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _export.SqlString.escape(dateVal.format("YYYY-MM-DD"));
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return "new java.text.SimpleDateFormat('yyyy-MM-dd').parse('".concat(dateVal.format("YYYY-MM-DD"), "')");
    },
    jsonLogic: function jsonLogic(val, fieldDef, wgtDef) {
      return (0, _moment["default"])(val, wgtDef.valueFormat).toDate();
    },
    toJS: function toJS(val, fieldSettings) {
      var dateVal = (0, _moment["default"])(val, fieldSettings.valueFormat);
      return dateVal.isValid() ? dateVal.toDate() : undefined;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return dateVal.isValid() ? dateVal.toDate() : undefined;
    }
  },
  time: {
    type: "time",
    jsType: "string",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaTimeWidget, props);
    },
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
    use12Hours: false,
    useKeyboard: true,
    valueLabel: "Time",
    valuePlaceholder: "Enter time",
    valueLabels: [{
      label: "Time from",
      placeholder: "Enter time from"
    }, {
      label: "Time to",
      placeholder: "Enter time to"
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? dateVal.format(wgtDef.timeFormat) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _export.SqlString.escape(dateVal.format("HH:mm:ss"));
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return "T(java.time.LocalTime).parse('".concat(dateVal.format("HH:mm:ss"), "')"); //return `new java.text.SimpleDateFormat('HH:mm:ss').parse('${dateVal.format("HH:mm:ss")}')`;
    },
    jsonLogic: function jsonLogic(val, fieldDef, wgtDef) {
      // return seconds of day
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return dateVal.get("hour") * 60 * 60 + dateVal.get("minute") * 60 + dateVal.get("second");
    },
    toJS: function toJS(val, fieldSettings) {
      // return seconds of day
      var dateVal = (0, _moment["default"])(val, fieldSettings.valueFormat);
      return dateVal.isValid() ? dateVal.get("hour") * 60 * 60 + dateVal.get("minute") * 60 + dateVal.get("second") : undefined;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      // return seconds of day
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return dateVal.get("hour") * 60 * 60 + dateVal.get("minute") * 60 + dateVal.get("second");
    },
    elasticSearchFormatValue: function elasticSearchFormatValue(queryType, value, operator, fieldName) {
      return {
        script: {
          script: {
            source: "doc[".concat(fieldName, "][0].getHour() >== params.min && doc[").concat(fieldName, "][0].getHour() <== params.max"),
            params: {
              min: value[0],
              max: value[1]
            }
          }
        }
      };
    }
  },
  datetime: {
    type: "datetime",
    jsType: "string",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaDateTimeWidget, props);
    },
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    use12Hours: false,
    useKeyboard: true,
    valueLabel: "Datetime",
    valuePlaceholder: "Enter datetime",
    valueLabels: [{
      label: "Datetime from",
      placeholder: "Enter datetime from"
    }, {
      label: "Datetime to",
      placeholder: "Enter datetime to"
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return isForDisplay ? dateVal.format(wgtDef.dateFormat + " " + wgtDef.timeFormat) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return _export.SqlString.escape(dateVal.toDate());
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return "new java.text.SimpleDateFormat('yyyy-MM-dd HH:mm:ss').parse('".concat(dateVal.format("YYYY-MM-DD HH:mm:ss"), "')");
    },
    jsonLogic: function jsonLogic(val, fieldDef, wgtDef) {
      return (0, _moment["default"])(val, wgtDef.valueFormat).toDate();
    },
    toJS: function toJS(val, fieldSettings) {
      var dateVal = (0, _moment["default"])(val, fieldSettings.valueFormat);
      return dateVal.isValid() ? dateVal.toDate() : undefined;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      var dateVal = (0, _moment["default"])(val, wgtDef.valueFormat);
      return dateVal.isValid() ? dateVal.toDate() : undefined;
    }
  },
  "boolean": {
    type: "boolean",
    jsType: "boolean",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(VanillaBooleanWidget, props);
    },
    labelYes: "Yes",
    labelNo: "No",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? val ? "Yes" : "No" : JSON.stringify(!!val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return (0, _export.spelEscape)(val);
    },
    defaultValue: false,
    toJS: function toJS(val, fieldSettings) {
      return val;
    },
    mongoFormatValue: function mongoFormatValue(val, fieldDef, wgtDef) {
      return val;
    }
  },
  field: {
    valueSrc: "field",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(ValueFieldWidget, props);
    },
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay, op, opDef, rightFieldDef) {
      return isForDisplay ? rightFieldDef.label || val : val;
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef, rightFieldDef) {
      return val;
    },
    spelFormatValue: function spelFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return val;
    },
    valueLabel: "Field to compare",
    valuePlaceholder: "Select field to compare",
    customProps: {
      showSearch: true
    }
  },
  func: {
    valueSrc: "func",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(FuncWidget, props);
    },
    valueLabel: "Function",
    valuePlaceholder: "Select function",
    customProps: {//showSearch: true
    }
  },
  case_value: {
    valueSrc: "value",
    type: "case_value",
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val === "" ? null : val);
    },
    spelImportValue: function spelImportValue(val) {
      return [val.value, []];
    },
    factory: function factory(_ref12) {
      var value = _ref12.value,
          setValue = _ref12.setValue;
      return /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        value: value || "",
        onChange: function onChange(e) {
          return setValue(e.target.value);
        }
      });
    }
  }
}; //----------------------------  types

var types = {
  text: {
    defaultOperator: "equal",
    mainWidget: "text",
    widgets: {
      text: {
        operators: ["equal", "not_equal", "like", "not_like", "starts_with", "ends_with", "proximity", "is_empty", "is_not_empty", "is_null", "is_not_null"],
        widgetProps: {},
        opProps: {}
      },
      textarea: {
        operators: ["equal", "not_equal", "like", "not_like", "starts_with", "ends_with", "is_empty", "is_not_empty", "is_null", "is_not_null"],
        widgetProps: {},
        opProps: {}
      },
      field: {
        operators: [//unary ops (like `is_empty`) will be excluded anyway, see getWidgetsForFieldOp()
        "equal", "not_equal", "proximity" //can exclude if you want
        ]
      }
    }
  },
  number: {
    defaultOperator: "equal",
    mainWidget: "number",
    widgets: {
      number: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      },
      slider: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  date: {
    defaultOperator: "equal",
    widgets: {
      date: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  time: {
    defaultOperator: "equal",
    widgets: {
      time: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  datetime: {
    defaultOperator: "equal",
    widgets: {
      datetime: {
        operators: ["equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  select: {
    mainWidget: "select",
    defaultOperator: "select_equals",
    widgets: {
      select: {
        operators: ["select_equals", "select_not_equals", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"],
        widgetProps: {
          customProps: {
            showSearch: true
          }
        }
      },
      multiselect: {
        operators: ["select_any_in", "select_not_any_in", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  multiselect: {
    defaultOperator: "multiselect_equals",
    widgets: {
      multiselect: {
        operators: ["multiselect_equals", "multiselect_not_equals", // "is_empty",
        // "is_not_empty",
        "is_null", "is_not_null"]
      }
    }
  },
  "boolean": {
    defaultOperator: "equal",
    widgets: {
      "boolean": {
        operators: ["equal", "not_equal", "is_null", "is_not_null"],
        widgetProps: {//you can enable this if you don't use fields as value sources
          // hideOperator: true,
          // operatorInlineLabel: "is",
        }
      },
      field: {
        operators: ["equal", "not_equal"]
      }
    }
  },
  "!group": {
    defaultOperator: "some",
    mainWidget: "number",
    widgets: {
      number: {
        widgetProps: {
          min: 0
        },
        operators: [// w/o operand
        "some", "all", "none", // w/ operand - count
        "equal", "not_equal", "less", "less_or_equal", "greater", "greater_or_equal", "between", "not_between"],
        opProps: {
          equal: {
            label: "Count =="
          },
          not_equal: {
            label: "Count !="
          },
          less: {
            label: "Count <"
          },
          less_or_equal: {
            label: "Count <="
          },
          greater: {
            label: "Count >"
          },
          greater_or_equal: {
            label: "Count >="
          },
          between: {
            label: "Count between"
          },
          not_between: {
            label: "Count not between"
          }
        }
      }
    }
  },
  "case_value": {
    mainWidget: "case_value",
    widgets: {
      case_value: {}
    }
  }
}; //----------------------------  settings

var settings = _objectSpread(_objectSpread({}, _default2.settings), {}, {
  formatField: function formatField(field, parts, label2, fieldDefinition, config, isForDisplay) {
    if (isForDisplay) return label2;else return field;
  },
  formatSpelField: function formatSpelField(field, parentField, parts, partsExt, fieldDefinition, config) {
    var fieldName = partsExt.map(function (_ref13, ind) {
      var key = _ref13.key,
          parent = _ref13.parent;

      if (ind == 0) {
        if (parent == "[map]") return "#this[".concat((0, _export.spelEscape)(key), "]");else if (parent == "[class]") return key;else return key;
      } else {
        if (parent == "map" || parent == "[map]") return "[".concat((0, _export.spelEscape)(key), "]");else if (parent == "class" || parent == "[class]") return ".".concat(key);else return ".".concat(key);
      }
    }).join("");

    if (fieldDefinition.isSpelVariable) {
      fieldName = "#" + fieldName;
    }

    return fieldName;
  },
  sqlFormatReverse: function sqlFormatReverse(q) {
    if (q == undefined) return undefined;
    return "NOT(" + q + ")";
  },
  spelFormatReverse: function spelFormatReverse(q) {
    if (q == undefined) return undefined;
    return "!(" + q + ")";
  },
  formatReverse: function formatReverse(q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) {
    if (q == undefined) return undefined;
    if (isForDisplay) return "NOT (" + q + ")";else return "!(" + q + ")";
  },
  formatAggr: function formatAggr(whereStr, aggrField, operator, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay, aggrFieldDef) {
    var labelForFormat = opDef.labelForFormat,
        cardinality = opDef.cardinality;

    if (cardinality == 0) {
      var cond = whereStr ? " HAVE ".concat(whereStr) : "";
      return "".concat(labelForFormat, " OF ").concat(aggrField).concat(cond);
    } else if (cardinality == undefined || cardinality == 1) {
      var _cond = whereStr ? " WHERE ".concat(whereStr) : "";

      return "COUNT OF ".concat(aggrField).concat(_cond, " ").concat(labelForFormat, " ").concat(value);
    } else if (cardinality == 2) {
      var _cond2 = whereStr ? " WHERE ".concat(whereStr) : "";

      var valFrom = value.first();
      var valTo = value.get(1);
      return "COUNT OF ".concat(aggrField).concat(_cond2, " ").concat(labelForFormat, " ").concat(valFrom, " AND ").concat(valTo);
    }
  },
  canCompareFieldWithField: function canCompareFieldWithField(leftField, leftFieldConfig, rightField, rightFieldConfig) {
    //for type == 'select'/'multiselect' you can check listValues
    return true;
  },
  // enable compare fields
  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    field: {
      label: "Field",
      widget: "field"
    },
    func: {
      label: "Function",
      widget: "func"
    }
  },
  customFieldSelectProps: {
    showSearch: true
  },
  defaultSliderWidth: "200px",
  defaultSelectWidth: "200px",
  defaultSearchWidth: "100px",
  defaultMaxRows: 5
}); //----------------------------


var _default = {
  conjunctions: conjunctions,
  operators: operators,
  widgets: widgets,
  types: types,
  settings: settings
};
exports["default"] = _default;