"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAndFixTree = exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var actions = _interopRequireWildcard(require("../actions"));

var _treeUtils = require("../utils/treeUtils");

var _stuff = require("../utils/stuff");

var _reactUtils = require("../utils/reactUtils");

var _validation = require("../utils/validation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var validateAndFixTree = function validateAndFixTree(newTree, _oldTree, newConfig, oldConfig) {
  var tree = (0, _validation.validateTree)(newTree, _oldTree, newConfig, oldConfig);
  tree = (0, _treeUtils.fixPathsInTree)(tree);
  return tree;
};

exports.validateAndFixTree = validateAndFixTree;

var Query = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Query, _PureComponent);

  var _super = _createSuper(Query);

  function Query(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Query);
    _this = _super.call(this, props);
    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this._updateActions(props);

    _this.validatedTree = _this.validateTree(props, props); //props.onChange && props.onChange(this.validatedTree, props.config);

    return _this;
  }

  (0, _createClass2["default"])(Query, [{
    key: "validateTree",
    value: function validateTree(props, oldProps) {
      return validateAndFixTree(props.tree, oldProps.tree, props.config, oldProps.config);
    }
  }, {
    key: "_updateActions",
    value: function _updateActions(props) {
      var config = props.config,
          dispatch = props.dispatch;
      this.actions = (0, _reactUtils.bindActionCreators)(_objectSpread(_objectSpread(_objectSpread({}, actions.tree), actions.group), actions.rule), config, dispatch);
    }
  }, {
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {
      var onChange = nextProps.onChange;
      var oldConfig = this.props.config;
      var newTree = nextProps.tree;
      var newConfig = nextProps.config;
      var oldValidatedTree = this.validatedTree;
      this.validatedTree = newTree;

      if (oldConfig !== newConfig) {
        this._updateActions(nextProps);

        this.validatedTree = this.validateTree(nextProps, this.props);
      }

      var validatedTreeChanged = !(0, _stuff.immutableEqual)(this.validatedTree, oldValidatedTree);

      if (validatedTreeChanged) {
        onChange && onChange(this.validatedTree, newConfig, nextProps.__lastAction);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          renderBuilder = _this$props.renderBuilder,
          dispatch = _this$props.dispatch,
          __isInternalValueChange = _this$props.__isInternalValueChange;
      var builderProps = {
        tree: this.validatedTree,
        actions: this.actions,
        config: config,
        dispatch: dispatch,
        __isInternalValueChange: __isInternalValueChange
      };
      return renderBuilder(builderProps);
    }
  }]);
  return Query;
}(_react.PureComponent);

exports["default"] = Query;
Query.propTypes = {
  config: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  renderBuilder: _propTypes["default"].func,
  tree: _propTypes["default"].any //instanceOf(Immutable.Map)
  //dispatch: PropTypes.func.isRequired,

};