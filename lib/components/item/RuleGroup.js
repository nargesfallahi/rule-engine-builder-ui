"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GroupContainer = _interopRequireDefault(require("../containers/GroupContainer"));

var _Draggable = _interopRequireDefault(require("../containers/Draggable"));

var _Group = require("./Group");

var _RuleGroupActions = require("./RuleGroupActions");

var _FieldWrapper = _interopRequireDefault(require("../rule/FieldWrapper"));

var _reactUtils = require("../../utils/reactUtils");

var _utils = require("../utils");

var _dec, _class, _class2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RuleGroup = (_dec = (0, _Draggable["default"])("group rule_group"), (0, _GroupContainer["default"])(_class = _dec(_class = (0, _utils.ConfirmFn)(_class = (_class2 = /*#__PURE__*/function (_BasicGroup) {
  (0, _inherits2["default"])(RuleGroup, _BasicGroup);

  var _super = _createSuper(RuleGroup);

  function RuleGroup(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RuleGroup);
    _this = _super.call(this, props);

    _this.childrenClassName = function () {
      return "rule_group--children";
    };

    _this.renderHeaderWrapper = function () {
      return null;
    };

    _this.renderFooterWrapper = function () {
      return null;
    };

    _this.renderConjs = function () {
      return null;
    };

    _this.canAddGroup = function () {
      return false;
    };

    _this.canAddRule = function () {
      return true;
    };

    _this.canDeleteGroup = function () {
      return false;
    };

    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this.onPropsChanged(props);

    return _this;
  }

  (0, _createClass2["default"])(RuleGroup, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {}
  }, {
    key: "reordableNodesCntForItem",
    value: function reordableNodesCntForItem(_item) {
      if (this.props.isLocked) return 0;
      var children1 = this.props.children1;
      return children1.size;
    }
  }, {
    key: "renderChildrenWrapper",
    value: function renderChildrenWrapper() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderDrag(), this.renderField(), this.renderActions(), (0, _get2["default"])((0, _getPrototypeOf2["default"])(RuleGroup.prototype), "renderChildrenWrapper", this).call(this));
    }
  }, {
    key: "renderField",
    value: function renderField() {
      var _this$props = this.props,
          config = _this$props.config,
          selectedField = _this$props.selectedField,
          setField = _this$props.setField,
          parentField = _this$props.parentField,
          id = _this$props.id,
          groupId = _this$props.groupId,
          isLocked = _this$props.isLocked;
      var immutableFieldsMode = config.settings.immutableFieldsMode;
      return /*#__PURE__*/_react["default"].createElement(_FieldWrapper["default"], {
        key: "field",
        classname: "group--field",
        config: config,
        selectedField: selectedField,
        setField: setField,
        parentField: parentField,
        readonly: immutableFieldsMode || isLocked,
        id: id,
        groupId: groupId
      });
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this$props2 = this.props,
          config = _this$props2.config,
          addRule = _this$props2.addRule,
          isLocked = _this$props2.isLocked,
          isTrueLocked = _this$props2.isTrueLocked,
          id = _this$props2.id;
      return /*#__PURE__*/_react["default"].createElement(_RuleGroupActions.RuleGroupActions, {
        config: config,
        addRule: addRule,
        canAddRule: this.canAddRule(),
        canDeleteGroup: this.canDeleteGroup(),
        removeSelf: this.removeSelf,
        setLock: this.setLock,
        isLocked: isLocked,
        isTrueLocked: isTrueLocked,
        id: id
      });
    }
  }, {
    key: "extraPropsForItem",
    value: function extraPropsForItem(_item) {
      return {
        parentField: this.props.selectedField
      };
    }
  }]);
  return RuleGroup;
}(_Group.BasicGroup), _class2.propTypes = _objectSpread(_objectSpread({}, _Group.BasicGroup.propTypes), {}, {
  selectedField: _propTypes["default"].string,
  parentField: _propTypes["default"].string,
  setField: _propTypes["default"].func
}), _class2)) || _class) || _class) || _class);
var _default = RuleGroup;
exports["default"] = _default;