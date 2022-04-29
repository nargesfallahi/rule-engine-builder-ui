"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _stuff = require("../utils/stuff");

var _autocomplete = require("../utils/autocomplete");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var useListValuesAutocomplete = function useListValuesAutocomplete(_ref, _ref2) {
  var asyncFetch = _ref.asyncFetch,
      useLoadMore = _ref.useLoadMore,
      useAsyncSearch = _ref.useAsyncSearch,
      forceAsyncSearch = _ref.forceAsyncSearch,
      selectedAsyncListValues = _ref.asyncListValues,
      staticListValues = _ref.listValues,
      allowCustomValues = _ref.allowCustomValues,
      selectedValue = _ref.value,
      setValue = _ref.setValue,
      placeholder = _ref.placeholder;
  var debounceTimeout = _ref2.debounceTimeout,
      multiple = _ref2.multiple;
  var knownSpecialValues = ["LOAD_MORE", "LOADING_MORE"];
  var loadMoreTitle = "Load more...";
  var loadingMoreTitle = "Loading more...";
  var aPlaceholder = forceAsyncSearch ? "Type to search" : placeholder; // state

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(undefined),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      asyncFetchMeta = _React$useState4[0],
      setAsyncFetchMeta = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(0),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      loadingCnt = _React$useState6[0],
      setLoadingCnt = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(false),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      isLoadingMore = _React$useState8[0],
      setIsLoadingMore = _React$useState8[1];

  var _React$useState9 = _react["default"].useState(""),
      _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
      inputValue = _React$useState10[0],
      setInputValue = _React$useState10[1];

  var _React$useState11 = _react["default"].useState(undefined),
      _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
      asyncListValues = _React$useState12[0],
      setAsyncListValues = _React$useState12[1]; // ref


  var asyncFectchCnt = _react["default"].useRef(0);

  var componentIsMounted = _react["default"].useRef(true);

  var isSelectedLoadMore = _react["default"].useRef(false); // compute


  var nSelectedAsyncListValues = (0, _stuff.listValuesToArray)(selectedAsyncListValues);
  var listValues = asyncFetch ? !allowCustomValues ? (0, _autocomplete.mergeListValues)(asyncListValues, nSelectedAsyncListValues, true) : asyncListValues : staticListValues; //const isDirtyInitialListValues = asyncListValues == undefined && selectedAsyncListValues && selectedAsyncListValues.length && typeof selectedAsyncListValues[0] != "object";

  var isLoading = loadingCnt > 0;
  var canInitialLoad = open && asyncFetch && asyncListValues === undefined && (forceAsyncSearch ? inputValue : true);
  var isInitialLoading = canInitialLoad && isLoading;
  var canLoadMore = !isInitialLoading && listValues && listValues.length > 0 && asyncFetchMeta && asyncFetchMeta.hasMore && (asyncFetchMeta.filter || "") === inputValue;
  var canShowLoadMore = !isLoading && canLoadMore;
  var options = (0, _stuff.mapListValues)(listValues, _autocomplete.listValueToOption);
  var hasValue = selectedValue != null; // const selectedListValue = hasValue ? getListValue(selectedValue, listValues) : null;
  // const selectedOption = listValueToOption(selectedListValue);
  // fetch

  var fetchListValues = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var filter,
          isLoadMore,
          offset,
          meta,
          newAsyncFetchCnt,
          res,
          isFetchCancelled,
          _ref4,
          values,
          hasMore,
          newMeta,
          nValues,
          assumeHasMore,
          newValues,
          realNewMeta,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filter = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
              isLoadMore = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

              // clear obsolete meta
              if (!isLoadMore && asyncFetchMeta) {
                setAsyncFetchMeta(undefined);
              }

              offset = isLoadMore && asyncListValues ? asyncListValues.length : 0;
              meta = isLoadMore && asyncFetchMeta || !useLoadMore && {
                pageSize: 0
              };
              newAsyncFetchCnt = ++asyncFectchCnt.current;
              _context.next = 8;
              return asyncFetch(filter, offset, meta);

            case 8:
              res = _context.sent;
              isFetchCancelled = asyncFectchCnt.current != newAsyncFetchCnt;

              if (!(isFetchCancelled || !componentIsMounted.current)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", null);

            case 12:
              _ref4 = res && res.values ? res : {
                values: res
              }, values = _ref4.values, hasMore = _ref4.hasMore, newMeta = _ref4.meta;
              nValues = (0, _stuff.listValuesToArray)(values);

              if (isLoadMore) {
                newValues = (0, _autocomplete.mergeListValues)(asyncListValues, nValues, false);
                assumeHasMore = newValues.length > asyncListValues.length;
              } else {
                newValues = nValues;

                if (useLoadMore) {
                  assumeHasMore = newValues.length > 0;
                }
              } // save new meta


              realNewMeta = hasMore != null || newMeta != null || assumeHasMore != null ? _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, assumeHasMore != null ? {
                hasMore: assumeHasMore
              } : {}), hasMore != null ? {
                hasMore: hasMore
              } : {}), newMeta != null ? newMeta : {}), {}, {
                filter: filter
              }) : undefined;

              if (realNewMeta) {
                setAsyncFetchMeta(realNewMeta);
              }

              return _context.abrupt("return", newValues);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchListValues() {
      return _ref3.apply(this, arguments);
    };
  }();

  var loadListValues = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var filter,
          isLoadMore,
          list,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filter = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
              isLoadMore = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              setLoadingCnt(function (x) {
                return x + 1;
              });
              setIsLoadingMore(isLoadMore);
              _context2.next = 6;
              return fetchListValues(filter, isLoadMore);

            case 6:
              list = _context2.sent;

              if (componentIsMounted.current) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return");

            case 9:
              if (list != null) {
                // tip: null can be used for reject (eg, if user don't want to filter by input)
                setAsyncListValues(list);
              }

              setLoadingCnt(function (x) {
                return x - 1;
              });
              setIsLoadingMore(false);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function loadListValues() {
      return _ref5.apply(this, arguments);
    };
  }();

  var loadListValuesDebounced = _react["default"].useCallback((0, _debounce["default"])(loadListValues, debounceTimeout), []); // Unmount


  _react["default"].useEffect(function () {
    return function () {
      componentIsMounted.current = false;
    };
  }, []); // Initial loading


  _react["default"].useEffect(function () {
    if (canInitialLoad && loadingCnt == 0 && asyncFectchCnt.current == 0) {
      (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return loadListValues();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }, [canInitialLoad]); // Event handlers


  var onOpen = function onOpen() {
    setOpen(true);
  };

  var onClose = function onClose(_e) {
    if (isSelectedLoadMore.current) {
      isSelectedLoadMore.current = false;

      if (multiple) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  var onDropdownVisibleChange = function onDropdownVisibleChange(open) {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  };

  var isSpecialValue = function isSpecialValue(option) {
    var specialValue = (option === null || option === void 0 ? void 0 : option.specialValue) || (option === null || option === void 0 ? void 0 : option.value);
    return knownSpecialValues.includes(specialValue);
  };

  var onChange = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_e, option) {
      var specialValue, _options, newSelectedListValues, newSelectedValues, v;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              specialValue = (option === null || option === void 0 ? void 0 : option.specialValue) || (option === null || option === void 0 ? void 0 : option.value) || multiple && option.map(function (opt) {
                return (opt === null || opt === void 0 ? void 0 : opt.specialValue) || (opt === null || opt === void 0 ? void 0 : opt.value);
              }).find(function (v) {
                return !!v;
              });

              if (!(specialValue == "LOAD_MORE")) {
                _context4.next = 7;
                break;
              }

              isSelectedLoadMore.current = true;
              _context4.next = 5;
              return loadListValues(inputValue, true);

            case 5:
              _context4.next = 8;
              break;

            case 7:
              if (specialValue == "LOADING_MORE") {
                isSelectedLoadMore.current = true;
              } else {
                if (multiple) {
                  _options = option;
                  newSelectedListValues = _options.map(function (o) {
                    return o.value != null ? o : (0, _autocomplete.getListValue)(o, listValues);
                  });
                  newSelectedValues = newSelectedListValues.map(function (o) {
                    return o.value;
                  });
                  if (!newSelectedValues.length) newSelectedValues = undefined; //not allow []

                  setValue(newSelectedValues, newSelectedListValues);
                } else {
                  v = option == null ? undefined : option.value;
                  setValue(v, [option]);
                }
              }

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function onChange(_x, _x2) {
      return _ref7.apply(this, arguments);
    };
  }();

  var onInputChange = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_e, newInputValue) {
      var val, canSearchAsync;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              val = newInputValue; //const isTypeToSearch = e.type == 'change';

              if (!(val === loadMoreTitle || val === loadingMoreTitle)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return");

            case 3:
              setInputValue(val);

              if (allowCustomValues) {
                if (multiple) {//todo
                } else {
                  setValue(val, [val]);
                }
              }

              canSearchAsync = useAsyncSearch && (forceAsyncSearch ? !!val : true);

              if (!canSearchAsync) {
                _context5.next = 11;
                break;
              }

              _context5.next = 9;
              return loadListValuesDebounced(val);

            case 9:
              _context5.next = 12;
              break;

            case 11:
              if (useAsyncSearch && forceAsyncSearch) {
                setAsyncListValues([]);
              }

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function onInputChange(_x3, _x4) {
      return _ref8.apply(this, arguments);
    };
  }(); // to keep compatibility with antD


  var onSearch = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(newInputValue) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(newInputValue === "" && !open)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              _context6.next = 4;
              return onInputChange(null, newInputValue);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function onSearch(_x5) {
      return _ref9.apply(this, arguments);
    };
  }(); // Options


  var extendOptions = function extendOptions(options) {
    var filtered = (0, _toConsumableArray2["default"])(options);

    if (useLoadMore) {
      if (canShowLoadMore) {
        filtered.push({
          specialValue: "LOAD_MORE",
          title: loadMoreTitle
        });
      } else if (isLoadingMore) {
        filtered.push({
          specialValue: "LOADING_MORE",
          title: loadingMoreTitle,
          disabled: true
        });
      }
    }

    return filtered;
  };

  var getOptionSelected = function getOptionSelected(option, valueOrOption) {
    if (valueOrOption == null) return null;
    var selectedValue = valueOrOption.value != undefined ? valueOrOption.value : valueOrOption;
    return option.value === selectedValue;
  };

  var getOptionDisabled = function getOptionDisabled(valueOrOption) {
    return valueOrOption && valueOrOption.disabled;
  };

  var getOptionLabel = function getOptionLabel(valueOrOption) {
    if (valueOrOption == null) return null;
    var option = valueOrOption.value != undefined ? valueOrOption : (0, _autocomplete.listValueToOption)((0, _autocomplete.getListValue)(valueOrOption, listValues));

    if (!option && valueOrOption.specialValue) {
      // special last 'Load more...' item
      return valueOrOption.title;
    }

    if (!option && allowCustomValues) {
      // there is just string value, it's not item from list
      return valueOrOption;
    }

    if (!option) {
      // weird
      return valueOrOption;
    }

    return option.title;
  };

  return {
    options: options,
    listValues: listValues,
    hasValue: hasValue,
    open: open,
    onOpen: onOpen,
    onClose: onClose,
    onDropdownVisibleChange: onDropdownVisibleChange,
    onChange: onChange,
    inputValue: inputValue,
    onInputChange: onInputChange,
    onSearch: onSearch,
    canShowLoadMore: canShowLoadMore,
    isInitialLoading: isInitialLoading,
    isLoading: isLoading,
    isLoadingMore: isLoadingMore,
    isSpecialValue: isSpecialValue,
    extendOptions: extendOptions,
    getOptionSelected: getOptionSelected,
    getOptionDisabled: getOptionDisabled,
    getOptionLabel: getOptionLabel,
    // unused
    //selectedListValue,
    //selectedOption,
    aPlaceholder: aPlaceholder
  };
};

var _default = useListValuesAutocomplete;
exports["default"] = _default;