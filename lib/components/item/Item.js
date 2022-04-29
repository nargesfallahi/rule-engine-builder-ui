"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Rule = _interopRequireDefault(require("./Rule"));

var _Group = _interopRequireDefault(require("./Group"));

var _RuleGroup = _interopRequireDefault(require("./RuleGroup"));

var _RuleGroupExt = _interopRequireDefault(require("./RuleGroupExt"));

var _SwitchGroup = _interopRequireDefault(require("./SwitchGroup"));

var _CaseGroup = _interopRequireDefault(require("./CaseGroup"));

var _excluded = ["type"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var types = ["rule", "group", "rule_group", "switch_group", "case_group"];

var getProperties = function getProperties(props) {
  var properties = props.properties.toObject();

  var result = _objectSpread({}, properties);

  if (props.isParentLocked) {
    result.isLocked = true;
  }

  if (properties.isLocked) {
    result.isTrueLocked = true;
  }

  return result;
};

var typeMap = {
  rule: function rule(props) {
    return /*#__PURE__*/_react["default"].createElement(_Rule["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      config: props.config,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      parentField: props.parentField,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  },
  group: function group(props) {
    return /*#__PURE__*/_react["default"].createElement(_Group["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      config: props.config //tree={props.tree}
      ,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      children1: props.children1,
      parentField: null,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  },
  rule_group: function rule_group(props) {
    return /*#__PURE__*/_react["default"].createElement(_RuleGroup["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      config: props.config //tree={props.tree}
      ,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      children1: props.children1,
      parentField: props.parentField,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  },
  rule_group_ext: function rule_group_ext(props) {
    return /*#__PURE__*/_react["default"].createElement(_RuleGroupExt["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      config: props.config //tree={props.tree}
      ,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      children1: props.children1,
      parentField: props.parentField,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  },
  switch_group: function switch_group(props) {
    return /*#__PURE__*/_react["default"].createElement(_SwitchGroup["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      config: props.config //tree={props.tree}
      ,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      children1: props.children1,
      parentField: null,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  },
  case_group: function case_group(props) {
    return /*#__PURE__*/_react["default"].createElement(_CaseGroup["default"], (0, _extends2["default"])({}, getProperties(props), {
      id: props.id,
      groupId: props.groupId,
      path: props.path,
      actions: props.actions,
      config: props.config //tree={props.tree}
      ,
      reordableNodesCnt: props.reordableNodesCnt,
      totalRulesCnt: props.totalRulesCnt,
      onDragStart: props.onDragStart,
      isDraggingTempo: props.isDraggingTempo,
      children1: props.children1,
      parentField: null,
      parentReordableNodesCnt: props.parentReordableNodesCnt
    }));
  }
};

var Item = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Item, _PureComponent);

  var _super = _createSuper(Item);

  function Item() {
    (0, _classCallCheck2["default"])(this, Item);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Item, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          props = (0, _objectWithoutProperties2["default"])(_this$props, _excluded);
      var mode = props.properties.get("mode");
      var postfix = mode == "array" ? "_ext" : "";
      var Cmp = typeMap[type + postfix];
      if (!Cmp) return null;
      return Cmp(props);
    }
  }]);
  return Item;
}(_react.PureComponent);

exports.Item = Item;
Item.propTypes = {
  //tree: PropTypes.instanceOf(Immutable.Map).isRequired,
  config: _propTypes["default"].object.isRequired,
  id: _propTypes["default"].string.isRequired,
  groupId: _propTypes["default"].string,
  type: _propTypes["default"].oneOf(types).isRequired,
  path: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.List)
  properties: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  children1: _propTypes["default"].any,
  //instanceOf(Immutable.OrderedMap)
  actions: _propTypes["default"].object.isRequired,
  reordableNodesCnt: _propTypes["default"].number,
  onDragStart: _propTypes["default"].func,
  parentField: _propTypes["default"].string,
  //from RuleGroup
  isDraggingTempo: _propTypes["default"].bool,
  isParentLocked: _propTypes["default"].bool
};