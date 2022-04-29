"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simulateAsyncFetch = exports.mergeListValues = exports.listValueToOption = exports.getListValue = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stuff = require("./stuff");

var simulateAsyncFetch = function simulateAsyncFetch(all) {
  var cPageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(search, offset, meta) {
      var pageSize, filtered, pages, currentOffset, currentPage, values, newOffset, hasMore;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pageSize = meta.pageSize != undefined ? meta.pageSize : cPageSize;
              filtered = (0, _stuff.listValuesToArray)(all).filter(function (_ref2) {
                var title = _ref2.title;
                return search == null ? true : title.toUpperCase().indexOf(search.toUpperCase()) != -1;
              });
              pages = pageSize ? Math.ceil(filtered.length / pageSize) : 0;
              currentOffset = offset || 0;
              currentPage = pageSize ? Math.ceil(currentOffset / pageSize) : null;
              values = pageSize ? filtered.slice(currentOffset, currentOffset + pageSize) : filtered;
              newOffset = pageSize ? currentOffset + values.length : null;
              hasMore = pageSize ? newOffset < filtered.length : false;
              console.debug("simulateAsyncFetch", {
                search: search,
                offset: offset,
                values: values,
                hasMore: hasMore,
                filtered: filtered
              });
              _context.next = 11;
              return (0, _stuff.sleep)(delay);

            case 11:
              return _context.abrupt("return", {
                values: values,
                hasMore: hasMore
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.simulateAsyncFetch = simulateAsyncFetch;

var mergeListValues = function mergeListValues(values, newValues) {
  var toStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!newValues) return values;
  var old = values || [];
  var newFiltered = newValues.filter(function (v) {
    return old.find(function (av) {
      return av.value == v.value;
    }) == undefined;
  });
  var merged = toStart ? [].concat((0, _toConsumableArray2["default"])(newFiltered), (0, _toConsumableArray2["default"])(old)) : [].concat((0, _toConsumableArray2["default"])(old), (0, _toConsumableArray2["default"])(newFiltered));
  return merged;
};

exports.mergeListValues = mergeListValues;

var listValueToOption = function listValueToOption(lv) {
  if (lv == null) return null;
  var title = lv.title,
      value = lv.value,
      disabled = lv.disabled,
      groupTitle = lv.groupTitle,
      renderTitle = lv.renderTitle;
  var option = {
    title: title,
    value: value
  };
  if (disabled) option.disabled = disabled;
  if (groupTitle) option.groupTitle = groupTitle;
  if (renderTitle) option.renderTitle = renderTitle;
  return option;
};

exports.listValueToOption = listValueToOption;

var getListValue = function getListValue(selectedValue, listValues) {
  return (0, _stuff.mapListValues)(listValues, function (lv) {
    return lv.value === selectedValue ? lv : null;
  }).filter(function (v) {
    return v !== null;
  }).shift();
};

exports.getListValue = getListValue;