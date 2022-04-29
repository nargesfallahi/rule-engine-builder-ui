"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configUtils = require("../../utils/configUtils");

var _excluded = ["factory"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var OperatorOptions = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(OperatorOptions, _PureComponent);

  var _super = _createSuper(OperatorOptions);

  function OperatorOptions() {
    (0, _classCallCheck2["default"])(this, OperatorOptions);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(OperatorOptions, [{
    key: "render",
    value: function render() {
      if (!this.props.selectedOperator) return null;
      var operatorDefinitions = (0, _configUtils.getOperatorConfig)(this.props.config, this.props.selectedOperator, this.props.selectedField);

      if (typeof operatorDefinitions.options === "undefined") {
        return null;
      }

      var _operatorDefinitions$ = operatorDefinitions.options,
          optionsFactory = _operatorDefinitions$.factory,
          basicOptionsProps = (0, _objectWithoutProperties2["default"])(_operatorDefinitions$, _excluded);
      var optionsProps = Object.assign({}, basicOptionsProps, {
        config: this.props.config,
        field: this.props.selectedField,
        operator: this.props.selectedOperator,
        options: this.props.operatorOptions,
        setOption: this.props.setOperatorOption,
        readonly: this.props.readonly
      });
      var optionsCmp = optionsFactory(optionsProps);
      var name = this.props.selectedOperator;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rule--operator rule--operator--".concat(name.toUpperCase())
      }, optionsCmp);
    }
  }]);
  return OperatorOptions;
}(_react.PureComponent);

exports["default"] = OperatorOptions;
OperatorOptions.propTypes = {
  config: _propTypes["default"].object.isRequired,
  operatorOptions: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  selectedField: _propTypes["default"].string.isRequired,
  selectedOperator: _propTypes["default"].string.isRequired,
  readonly: _propTypes["default"].bool,
  //actions
  setOperatorOption: _propTypes["default"].func.isRequired
};