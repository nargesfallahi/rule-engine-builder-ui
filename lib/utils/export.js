"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sqlEmptyValue = exports.spelImportConcat = exports.spelFormatConcat = exports.spelFixList = exports.spelEscape = exports.mongoEmptyValue = exports.SqlString = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var SqlString = require("sqlstring");

exports.SqlString = SqlString;

SqlString.trim = function (val) {
  if (val.charAt(0) == "'") return val.substring(1, val.length - 1);else return val;
};

SqlString.escapeLike = function (val) {
  var any_start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var any_end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // normal escape
  var res = SqlString.escape(val); // unwrap ''

  res = SqlString.trim(res); // escape % and _

  res = res.replace(/[%_]/g, "\\$&"); // wrap with % for LIKE

  res = (any_start ? "%" : "") + res + (any_end ? "%" : ""); // wrap ''

  res = "'" + res + "'";
  return res;
};

var sqlEmptyValue = function sqlEmptyValue(fieldDef) {
  var v = "''";
  var type = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.type;

  if (type == "date") {
    //todo: support other SQL dialects?  0001-01-01 for oracle, 1970-01-01 for timestamp
    v = "'0000-00-00'";
  } else if (type == "datetime") {
    v = "'0000-00-00 00:00'";
  } else if (type == "time") {
    v = "'00:00'";
  } else if (type == "number") {
    v = "0";
  }

  return v;
};

exports.sqlEmptyValue = sqlEmptyValue;

var mongoEmptyValue = function mongoEmptyValue(fieldDef) {
  var v = "";
  var type = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.type;

  if (type == "number") {
    v = 0;
  }

  return v;
};

exports.mongoEmptyValue = mongoEmptyValue;

var spelEscapeString = function spelEscapeString(val) {
  // Strings are delimited by single quotes. To put a single quote itself in a string, use two single quote characters. 
  return "'" + val.replace(/'/g, "''") + "'";
};

var spelInlineList = function spelInlineList(vals) {
  var toArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // find java type of values
  var javaType;
  var jt;
  var numberJavaTypes = ["int", "float"];
  vals.map(function (v) {
    if (v !== undefined && v !== null) {
      if (typeof v === "string") {
        jt = "String";
      } else if (typeof v === "number") {
        jt = Number.isInteger(v) ? "int" : "float";
      } else throw new Error("spelEscape: Can't use value ".concat(v, " in array"));

      if (!javaType) {
        javaType = jt;
      } else if (javaType != jt) {
        if (numberJavaTypes.includes(javaType) && numberJavaTypes.includes(jt)) {
          // found int and float in collecton - use float
          javaType = "float";
        } else throw new Error("spelEscape: Can't use different types in array: found ".concat(javaType, " and ").concat(jt));
      }
    }
  });

  if (!javaType) {
    javaType = "String"; //default if empty array
  } // for floats we should add 'f' to all items


  var escapedVals;

  if (javaType == "float") {
    escapedVals = vals.map(function (v) {
      return spelEscape(v, true);
    });
  } else {
    escapedVals = vals.map(function (v) {
      return spelEscape(v);
    });
  } // build inline list or array


  var res;

  if (toArray) {
    res = "new ".concat(javaType, "[]{").concat(escapedVals.join(", "), "}");
  } else {
    res = "{".concat(escapedVals.join(", "), "}");
  }

  return res;
};

var spelFixList = function spelFixList(val) {
  // `{1,2}.contains(1)` NOT works
  // `{1,2}.?[true].contains(1)` works
  return "".concat(val, ".?[true]");
};

exports.spelFixList = spelFixList;

var spelEscape = function spelEscape(val) {
  var numberToFloat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var arrayToArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/expressions.html#expressions-ref-literal
  if (val === undefined || val === null) {
    return "null";
  }

  switch ((0, _typeof2["default"])(val)) {
    case "boolean":
      return val ? "true" : "false";

    case "number":
      if (!Number.isFinite(val) || isNaN(val)) return undefined;
      return val + (!Number.isInteger(val) || numberToFloat ? "f" : "");

    case "object":
      if (Array.isArray(val)) {
        return spelInlineList(val, arrayToArray);
      } else {
        // see `spelFormatValue` for Date, LocalTime
        throw new Error("spelEscape: Object is not supported");
      }

    default:
      return spelEscapeString(val);
  }
};

exports.spelEscape = spelEscape;

var spelFormatConcat = function spelFormatConcat(parts) {
  if (parts && Array.isArray(parts) && parts.length) {
    return parts.map(function (part) {
      if (part.type == "const") {
        return spelEscape(part.value);
      } else if (part.type == "property") {
        return "" + part.value;
      } else if (part.type == "variable") {
        return "#" + part.value;
      }

      return undefined;
    }).filter(function (r) {
      return r != undefined;
    }).join(" + ");
  } else {
    return "null";
  }
}; // `val` is {value, valueType, valueSrc}
// If `valueType` == "case_value", `value` is array of such items (to be considered as concatenation)


exports.spelFormatConcat = spelFormatConcat;

var spelImportConcat = function spelImportConcat(val) {
  if (val == undefined) return [undefined, []];
  var errors = [];
  var parts = val.valueType == "case_value" ? val.value : [val];
  var res = parts.map(function (child) {
    if (child.valueSrc == "value") {
      if (child.value === null) {
        return undefined;
      } else {
        return {
          type: "const",
          value: child.value
        };
      }
    } else if (child.valueSrc == "field") {
      return {
        type: child.isVariable ? "variable" : "property",
        value: child.value
      };
    } else {
      errors.push("Unsupported valueSrc ".concat(child.valueSrc, " in concatenation"));
    }
  }).filter(function (v) {
    return v != undefined;
  });
  return [res, errors];
};

exports.spelImportConcat = spelImportConcat;