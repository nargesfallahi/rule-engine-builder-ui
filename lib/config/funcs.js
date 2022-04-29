"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPPER = exports.RELATIVE_DATETIME = exports.NOW = exports.LOWER = exports.LINEAR_REGRESSION = void 0;

var _moment = _interopRequireDefault(require("moment"));

var NOW = {
  label: "Now",
  returnType: "datetime",
  jsonLogic: "now",
  //todo: document option `jsonLogicCustomOps`
  //todo: add util to return all used custom ops to be added by user with `jsonLogic.add_operation`
  jsonLogicCustomOps: {
    now: function now() {
      return new Date();
    }
  },
  spelFunc: "new java.util.Date()",
  sqlFormatFunc: function sqlFormatFunc() {
    return "NOW()";
  },
  mongoFormatFunc: function mongoFormatFunc() {
    return new Date();
  },
  formatFunc: function formatFunc() {
    return "NOW";
  }
};
exports.NOW = NOW;
var RELATIVE_DATETIME = {
  label: "Relative",
  returnType: "datetime",
  renderBrackets: ["", ""],
  renderSeps: ["", "", ""],
  jsonLogic: function jsonLogic(_ref) {
    var date = _ref.date,
        op = _ref.op,
        val = _ref.val,
        dim = _ref.dim;
    return {
      "date_add": [date, val * (op == "minus" ? -1 : +1), dim]
    };
  },
  jsonLogicImport: function jsonLogicImport(v) {
    var date = v["date_add"][0];
    var val = Math.abs(v["date_add"][1]);
    var op = v["date_add"][1] >= 0 ? "plus" : "minus";
    var dim = v["date_add"][2];
    return [date, op, val, dim];
  },
  jsonLogicCustomOps: {
    date_add: function date_add(date, val, dim) {
      return (0, _moment["default"])(date).add(val, dim).toDate();
    }
  },
  // MySQL
  //todo: other SQL dialects?
  sqlFormatFunc: function sqlFormatFunc(_ref2) {
    var date = _ref2.date,
        op = _ref2.op,
        val = _ref2.val,
        dim = _ref2.dim;
    return "DATE_ADD(".concat(date, ", INTERVAL ").concat(parseInt(val) * (op == "minus" ? -1 : +1), " ").concat(dim.replace(/^'|'$/g, ""), ")");
  },
  mongoFormatFunc: null,
  //todo: support?
  //todo: spel
  formatFunc: function formatFunc(_ref3) {
    var date = _ref3.date,
        op = _ref3.op,
        val = _ref3.val,
        dim = _ref3.dim;
    return !val ? date : "".concat(date, " ").concat(op == "minus" ? "-" : "+", " ").concat(val, " ").concat(dim);
  },
  args: {
    date: {
      label: "Date",
      type: "datetime",
      defaultValue: {
        func: "NOW",
        args: []
      },
      valueSources: ["func", "field"]
    },
    op: {
      label: "Op",
      type: "select",
      defaultValue: "plus",
      valueSources: ["value"],
      mainWidgetProps: {
        customProps: {
          showSearch: false
        }
      },
      fieldSettings: {
        listValues: {
          plus: "+",
          minus: "-"
        }
      }
    },
    val: {
      label: "Value",
      type: "number",
      fieldSettings: {
        min: 0
      },
      defaultValue: 0,
      valueSources: ["value"]
    },
    dim: {
      label: "Dimension",
      type: "select",
      defaultValue: "day",
      valueSources: ["value"],
      mainWidgetProps: {
        customProps: {
          showSearch: false
        }
      },
      fieldSettings: {
        listValues: {
          day: "day",
          week: "week",
          month: "month",
          year: "year"
        }
      }
    }
  }
};
exports.RELATIVE_DATETIME = RELATIVE_DATETIME;
var LOWER = {
  label: "Lowercase",
  mongoFunc: "$toLower",
  jsonLogic: "toLowerCase",
  spelFunc: ".toLowerCase",
  //jsonLogicIsMethod: true, // Removed in JsonLogic 2.x due to Prototype Pollution
  jsonLogicCustomOps: {
    toLowerCase: function toLowerCase(str) {
      return str.toLowerCase();
    }
  },
  returnType: "text",
  args: {
    str: {
      label: "String",
      type: "text",
      valueSources: ["value", "field"]
    }
  }
};
exports.LOWER = LOWER;
var UPPER = {
  label: "Uppercase",
  mongoFunc: "$toUpper",
  jsonLogic: "toUpperCase",
  spelFunc: ".toUpperCase",
  //jsonLogicIsMethod: true, // Removed in JsonLogic 2.x due to Prototype Pollution
  jsonLogicCustomOps: {
    toUpperCase: function toUpperCase(str) {
      return str.toUpperCase();
    }
  },
  returnType: "text",
  args: {
    str: {
      label: "String",
      type: "text",
      valueSources: ["value", "field"]
    }
  }
};
exports.UPPER = UPPER;
var LINEAR_REGRESSION = {
  label: "Linear regression",
  returnType: "number",
  formatFunc: function formatFunc(_ref4, _) {
    var coef = _ref4.coef,
        bias = _ref4.bias,
        val = _ref4.val;
    return "(".concat(coef, " * ").concat(val, " + ").concat(bias, ")");
  },
  sqlFormatFunc: function sqlFormatFunc(_ref5) {
    var coef = _ref5.coef,
        bias = _ref5.bias,
        val = _ref5.val;
    return "(".concat(coef, " * ").concat(val, " + ").concat(bias, ")");
  },
  spelFormatFunc: function spelFormatFunc(_ref6) {
    var coef = _ref6.coef,
        bias = _ref6.bias,
        val = _ref6.val;
    return "(".concat(coef, " * ").concat(val, " + ").concat(bias, ")");
  },
  mongoFormatFunc: function mongoFormatFunc(_ref7) {
    var coef = _ref7.coef,
        bias = _ref7.bias,
        val = _ref7.val;
    return {
      "$sum": [{
        "$multiply": [coef, val]
      }, bias]
    };
  },
  jsonLogic: function jsonLogic(_ref8) {
    var coef = _ref8.coef,
        bias = _ref8.bias,
        val = _ref8.val;
    return {
      "+": [{
        "*": [coef, val]
      }, bias]
    };
  },
  jsonLogicImport: function jsonLogicImport(v) {
    var coef = v["+"][0]["*"][0];
    var val = v["+"][0]["*"][1];
    var bias = v["+"][1];
    return [coef, val, bias];
  },
  renderBrackets: ["", ""],
  renderSeps: [" * ", " + "],
  args: {
    coef: {
      label: "Coef",
      type: "number",
      defaultValue: 1,
      valueSources: ["value"]
    },
    val: {
      label: "Value",
      type: "number",
      valueSources: ["value", "field"]
    },
    bias: {
      label: "Bias",
      type: "number",
      defaultValue: 0,
      valueSources: ["value"]
    }
  }
};
exports.LINEAR_REGRESSION = LINEAR_REGRESSION;