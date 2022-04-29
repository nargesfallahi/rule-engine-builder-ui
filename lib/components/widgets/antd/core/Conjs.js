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

var _map = _interopRequireDefault(require("lodash/map"));

var _antd = require("antd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ButtonGroup = _antd.Button.Group;

var ConjsButton = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(ConjsButton, _PureComponent);

  var _super = _createSuper(ConjsButton);

  function ConjsButton() {
    var _this;

    (0, _classCallCheck2["default"])(this, ConjsButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onClick = function (_e) {
      var _this$props = _this.props,
          setConjunction = _this$props.setConjunction,
          item = _this$props.item;
      var conj = item.key;
      setConjunction(conj);
    };

    return _this;
  }

  (0, _createClass2["default"])(ConjsButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          item = _this$props2.item;
      return /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: disabled,
        type: item.checked ? "primary" : null,
        onClick: this.onClick
      }, item.label);
    }
  }]);
  return ConjsButton;
}(_react.PureComponent);

var ConjsButtons = /*#__PURE__*/function (_PureComponent2) {
  (0, _inherits2["default"])(ConjsButtons, _PureComponent2);

  var _super2 = _createSuper(ConjsButtons);

  function ConjsButtons() {
    var _this2;

    (0, _classCallCheck2["default"])(this, ConjsButtons);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _this2.setNot = function (e) {
      var _this2$props = _this2.props,
          setNot = _this2$props.setNot,
          not = _this2$props.not;
      if (setNot) setNot(!not);
    };

    return _this2;
  }

  (0, _createClass2["default"])(ConjsButtons, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          readonly = _this$props3.readonly,
          disabled = _this$props3.disabled,
          not = _this$props3.not,
          conjunctionOptions = _this$props3.conjunctionOptions,
          config = _this$props3.config,
          setConjunction = _this$props3.setConjunction,
          notLabel = _this$props3.notLabel,
          showNot = _this$props3.showNot;
      var conjsCount = Object.keys(conjunctionOptions).length;
      var lessThenTwo = disabled;
      var _config$settings = config.settings,
          forceShowConj = _config$settings.forceShowConj,
          renderSize = _config$settings.renderSize;
      var showConj = forceShowConj || conjsCount > 1 && !lessThenTwo;
      return /*#__PURE__*/_react["default"].createElement(ButtonGroup, {
        key: "group-conjs-buttons",
        size: renderSize,
        disabled: disabled || readonly
      }, showNot && (readonly ? not : true) && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        key: "group-not",
        onClick: this.setNot,
        type: not ? "primary" : null,
        disabled: readonly
      }, notLabel), showConj && (0, _map["default"])(conjunctionOptions, function (item, _index) {
        return (readonly || disabled) && !item.checked ? null : /*#__PURE__*/_react["default"].createElement(ConjsButton, {
          key: item.id,
          item: item,
          disabled: disabled || readonly,
          setConjunction: setConjunction
        });
      }));
    }
  }]);
  return ConjsButtons;
}(_react.PureComponent); // obsolete

/*
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ConjsRadios extends PureComponent {
  setConjunction = (e) => {
    const {setConjunction} = this.props;
    const conj = e.target.value;
    setConjunction(conj);
  }

  render() {
    const {readonly, disabled, selectedConjunction, conjunctionOptions, config} = this.props;
    return (
      <RadioGroup
        key="group-conjs-radios"
        disabled={disabled}
        value={selectedConjunction}
        size={config.settings.renderSize}
        onChange={this.setConjunction}
      >
        {map(conjunctionOptions, (item, _index) => readonly && !item.checked ? null : (
          <RadioButton
            key={item.id}
            value={item.key}
            //checked={item.checked}
          >{item.label}</RadioButton>
        ))}
      </RadioGroup>
    );
  }
}
*/


exports["default"] = ConjsButtons;