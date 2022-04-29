"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupActions = void 0;

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

var groupActionsPositionList = {
  topLeft: "group--actions--tl",
  topCenter: "group--actions--tc",
  topRight: "group--actions--tr",
  bottomLeft: "group--actions--bl",
  bottomCenter: "group--actions--bc",
  bottomRight: "group--actions--br"
};
var defaultPosition = "topRight";

var GroupActions = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(GroupActions, _PureComponent);

  var _super = _createSuper(GroupActions);

  function GroupActions() {
    (0, _classCallCheck2["default"])(this, GroupActions);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GroupActions, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          addRule = _this$props.addRule,
          addGroup = _this$props.addGroup,
          removeSelf = _this$props.removeSelf,
          setLock = _this$props.setLock,
          isLocked = _this$props.isLocked,
          isTrueLocked = _this$props.isTrueLocked,
          id = _this$props.id,
          canAddGroup = _this$props.canAddGroup,
          canAddRule = _this$props.canAddRule,
          canDeleteGroup = _this$props.canDeleteGroup;
      var _config$settings = config.settings,
          immutableGroupsMode = _config$settings.immutableGroupsMode,
          addRuleLabel = _config$settings.addRuleLabel,
          addGroupLabel = _config$settings.addGroupLabel,
          delGroupLabel = _config$settings.delGroupLabel,
          groupActionsPosition = _config$settings.groupActionsPosition,
          Btn = _config$settings.renderButton,
          Switch = _config$settings.renderSwitch,
          BtnGrp = _config$settings.renderButtonGroup,
          lockLabel = _config$settings.lockLabel,
          lockedLabel = _config$settings.lockedLabel,
          showLock = _config$settings.showLock,
          canDeleteLocked = _config$settings.canDeleteLocked;
      var position = groupActionsPositionList[groupActionsPosition || defaultPosition];

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
        type: "addRule",
        onClick: addRule,
        label: addRuleLabel,
        readonly: isLocked,
        config: config
      });

      var addGroupBtn = !immutableGroupsMode && canAddGroup && !isLocked && /*#__PURE__*/_react["default"].createElement(Btn, {
        type: "addGroup",
        onClick: addGroup,
        label: addGroupLabel,
        readonly: isLocked,
        config: config
      });

      var delGroupBtn = !immutableGroupsMode && canDeleteGroup && (!isLocked || isLocked && canDeleteLocked) && /*#__PURE__*/_react["default"].createElement(Btn, {
        type: "delGroup",
        onClick: removeSelf,
        label: delGroupLabel,
        config: config
      });

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "group--actions ".concat(position)
      }, /*#__PURE__*/_react["default"].createElement(BtnGrp, {
        config: config
      }, setLockSwitch, addRuleBtn, addGroupBtn, delGroupBtn));
    }
  }]);
  return GroupActions;
}(_react.PureComponent);

exports.GroupActions = GroupActions;