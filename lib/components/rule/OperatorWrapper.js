"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _Operator = _interopRequireDefault(require("./Operator"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var OperatorWrapper = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(OperatorWrapper, _PureComponent);

  var _super = _createSuper(OperatorWrapper);

  function OperatorWrapper() {
    (0, _classCallCheck2["default"])(this, OperatorWrapper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(OperatorWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          selectedField = _this$props.selectedField,
          selectedOperator = _this$props.selectedOperator,
          setOperator = _this$props.setOperator,
          selectedFieldPartsLabels = _this$props.selectedFieldPartsLabels,
          showOperator = _this$props.showOperator,
          showOperatorLabel = _this$props.showOperatorLabel,
          selectedFieldWidgetConfig = _this$props.selectedFieldWidgetConfig,
          readonly = _this$props.readonly,
          id = _this$props.id,
          groupId = _this$props.groupId;

      var operator = showOperator && /*#__PURE__*/_react["default"].createElement(_utils.Col, {
        key: "operators-for-" + (selectedFieldPartsLabels || []).join("_"),
        className: "rule--operator"
      }, config.settings.showLabels && /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, config.settings.operatorLabel), /*#__PURE__*/_react["default"].createElement(_Operator["default"], {
        key: "operator",
        config: config,
        selectedField: selectedField,
        selectedOperator: selectedOperator,
        setOperator: setOperator,
        readonly: readonly,
        id: id,
        groupId: groupId
      }));

      var hiddenOperator = showOperatorLabel && /*#__PURE__*/_react["default"].createElement(_utils.Col, {
        key: "operators-for-" + (selectedFieldPartsLabels || []).join("_"),
        className: "rule--operator"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "rule--operator"
      }, config.settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, "\xA0") : null, /*#__PURE__*/_react["default"].createElement("span", null, selectedFieldWidgetConfig.operatorInlineLabel)));

      return [operator, hiddenOperator];
    }
  }]);
  return OperatorWrapper;
}(_react.PureComponent);

exports["default"] = OperatorWrapper;