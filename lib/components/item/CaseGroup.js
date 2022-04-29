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

var _GroupActions = require("./GroupActions");

var _reactUtils = require("../../utils/reactUtils");

var _utils = require("../utils");

var _Widget = _interopRequireDefault(require("../rule/Widget"));

var _dec, _class, _class2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var classNames = require("classnames");

var CaseGroup = (_dec = (0, _Draggable["default"])("group case_group"), (0, _GroupContainer["default"])(_class = _dec(_class = (0, _utils.ConfirmFn)(_class = (_class2 = /*#__PURE__*/function (_BasicGroup) {
  (0, _inherits2["default"])(CaseGroup, _BasicGroup);

  var _super = _createSuper(CaseGroup);

  function CaseGroup(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, CaseGroup);
    _this = _super.call(this, props);

    _this.childrenClassName = function () {
      return "case_group--children";
    };

    _this.renderFooterWrapper = function () {
      return null;
    };

    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this.onPropsChanged(props);

    return _this;
  }

  (0, _createClass2["default"])(CaseGroup, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {}
  }, {
    key: "isDefaultCase",
    value: function isDefaultCase() {
      return this.props.children1 == undefined;
    }
  }, {
    key: "reordableNodesCnt",
    value: function reordableNodesCnt() {
      // `parentReordableNodesCnt` is number of cases to reorder
      return this.props.parentReordableNodesCnt;
    }
  }, {
    key: "reordableNodesCntForItem",
    value: function reordableNodesCntForItem(_item) {
      // `reordableNodesCnt` is number of nodes is current case
      if (this.props.isLocked) return 0;
      return this.props.reordableNodesCnt;
    }
  }, {
    key: "totalRulesCntForItem",
    value: function totalRulesCntForItem(_item) {
      // `totalRulesCnt` is number of nodes is current case
      return this.props.totalRulesCnt;
    }
  }, {
    key: "showDragIcon",
    value: function showDragIcon() {
      // default impl of `showDragIcon()` uses `this.reordableNodesCnt()`
      if (this.isDefaultCase()) return false;
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(CaseGroup.prototype), "showDragIcon", this).call(this);
    }
  }, {
    key: "renderHeaderWrapper",
    value: function renderHeaderWrapper() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "group-header",
        className: classNames("group--header", this.isOneChild() ? "one--child" : "", this.showDragIcon() ? "with--drag" : "hide--drag", this.showConjs() && (!this.isOneChild() || this.showNot()) ? "with--conjs" : "hide--conjs")
      }, this.renderHeaderLeft(), this.renderHeaderCenter(), this.renderActions());
    }
  }, {
    key: "renderChildrenWrapper",
    value: function renderChildrenWrapper() {
      if (this.isDefaultCase()) return null; // body has 2 columns: condition & value

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "case_group--body"
      }, this.renderCondition(), this.renderValue());
    }
  }, {
    key: "renderHeaderLeft",
    value: function renderHeaderLeft() {
      if (this.isDefaultCase()) {
        var defaultCaseLabel = this.props.config.settings.defaultCaseLabel;
        return defaultCaseLabel || "";
      } // default impl:


      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "group--conjunctions"
      }, this.renderConjs(), this.renderDrag());
    }
  }, {
    key: "renderCondition",
    value: function renderCondition() {
      if (this.isDefaultCase()) return null;
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(CaseGroup.prototype), "renderChildrenWrapper", this).call(this);
    }
  }, {
    key: "renderHeaderCenter",
    value: function renderHeaderCenter() {
      if (this.isDefaultCase()) return this.renderValue();else return null;
    }
  }, {
    key: "canAddGroup",
    value: function canAddGroup() {
      if (this.isDefaultCase()) return false;
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(CaseGroup.prototype), "canAddGroup", this).call(this);
    }
  }, {
    key: "canAddRule",
    value: function canAddRule() {
      if (this.isDefaultCase()) return false;
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(CaseGroup.prototype), "canAddRule", this).call(this);
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var _this$props = this.props,
          config = _this$props.config,
          isLocked = _this$props.isLocked,
          value = _this$props.value,
          setValue = _this$props.setValue,
          id = _this$props.id;
      var immutableValuesMode = config.settings.immutableValuesMode;

      var widget = /*#__PURE__*/_react["default"].createElement(_Widget["default"], {
        key: "values",
        isCaseValue: true,
        field: "!case_value",
        operator: null,
        value: value,
        valueSrc: "value",
        valueError: null,
        config: config,
        setValue: !immutableValuesMode ? setValue : _utils.dummyFn,
        setValueSrc: _utils.dummyFn,
        readonly: immutableValuesMode || isLocked,
        id: id,
        groupId: null
      });

      return /*#__PURE__*/_react["default"].createElement(_utils.Col, {
        className: "case_group--value"
      }, widget);
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this$props2 = this.props,
          config = _this$props2.config,
          addGroup = _this$props2.addGroup,
          addRule = _this$props2.addRule,
          isLocked = _this$props2.isLocked,
          isTrueLocked = _this$props2.isTrueLocked,
          id = _this$props2.id;
      return /*#__PURE__*/_react["default"].createElement(_GroupActions.GroupActions, {
        config: config,
        addGroup: addGroup,
        addRule: addRule,
        canAddRule: this.canAddRule(),
        canAddGroup: this.canAddGroup(),
        canDeleteGroup: this.canDeleteGroup(),
        removeSelf: this.removeSelf,
        setLock: this.setLock,
        isLocked: isLocked,
        isTrueLocked: isTrueLocked,
        id: id
      });
    }
  }, {
    key: "isEmptyCurrentGroup",
    value: function isEmptyCurrentGroup() {
      // used to confirm self-deletion
      var value = this.props.value;
      var oneValue = value && value.size ? value.get(0) : null;
      var hasValue = oneValue != null && (Array.isArray(oneValue) ? oneValue.length > 0 : true);
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(CaseGroup.prototype), "isEmptyCurrentGroup", this).call(this) && !hasValue;
    }
  }]);
  return CaseGroup;
}(_Group.BasicGroup), _class2.propTypes = _objectSpread(_objectSpread({}, _Group.BasicGroup.propTypes), {}, {
  parentReordableNodesCnt: _propTypes["default"].number,
  value: _propTypes["default"].any,
  setValue: _propTypes["default"].func
}), _class2)) || _class) || _class) || _class);
var _default = CaseGroup;
exports["default"] = _default;