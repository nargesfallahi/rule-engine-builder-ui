"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleGroupExtActions = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RuleGroupExtActions = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(RuleGroupExtActions, _PureComponent);

  var _super = _createSuper(RuleGroupExtActions);

  function RuleGroupExtActions() {
    (0, _classCallCheck2["default"])(this, RuleGroupExtActions);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(RuleGroupExtActions, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          addRule = _this$props.addRule,
          canAddRule = _this$props.canAddRule,
          canDeleteGroup = _this$props.canDeleteGroup,
          removeSelf = _this$props.removeSelf,
          setLock = _this$props.setLock,
          isLocked = _this$props.isLocked,
          isTrueLocked = _this$props.isTrueLocked,
          id = _this$props.id;
      var _config$settings = config.settings,
          immutableGroupsMode = _config$settings.immutableGroupsMode,
          addSubRuleLabel = _config$settings.addSubRuleLabel,
          delGroupLabel = _config$settings.delGroupLabel,
          Btn = _config$settings.renderButton,
          Switch = _config$settings.renderSwitch,
          BtnGrp = _config$settings.renderButtonGroup,
          lockLabel = _config$settings.lockLabel,
          lockedLabel = _config$settings.lockedLabel,
          showLock = _config$settings.showLock,
          canDeleteLocked = _config$settings.canDeleteLocked;

      var setLockSwitch = showLock && !(isLocked && !isTrueLocked) && /*#__PURE__*/_react["default"].createElement(Switch, {
        type: "lock",
        id: id,
        value: isLocked,
        setValue: setLock,
        label: lockLabel,
        checkedLabel: lockedLabel,
        config: config
      });

      var addRuleBtn = !immutableGroupsMode && canAddRule && !isLocked && /*#__PURE__*/_react["default"].createElement(Btn, {
        type: "addRuleGroupExt",
        onClick: addRule,
        label: addSubRuleLabel,
        readonly: isLocked,
        config: config
      });

      var delGroupBtn = !immutableGroupsMode && canDeleteGroup && (!isLocked || isLocked && canDeleteLocked) && /*#__PURE__*/_react["default"].createElement(Btn, {
        type: "delRuleGroup",
        onClick: removeSelf,
        label: delGroupLabel,
        config: config
      });

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "group--actions group--actions--tr"
      }, /*#__PURE__*/_react["default"].createElement(BtnGrp, {
        config: config
      }, setLockSwitch, addRuleBtn, delGroupBtn));
    }
  }]);
  return RuleGroupExtActions;
}(_react.PureComponent);

exports.RuleGroupExtActions = RuleGroupExtActions;