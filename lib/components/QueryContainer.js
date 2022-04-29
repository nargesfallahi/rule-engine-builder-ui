"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tree = _interopRequireDefault(require("../stores/tree"));

var _context = _interopRequireDefault(require("../stores/context"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var actions = _interopRequireWildcard(require("../actions"));

var _configUtils = require("../utils/configUtils");

var _stuff = require("../utils/stuff");

var _defaultUtils = require("../utils/defaultUtils");

var _reactUtils = require("../utils/reactUtils");

var _pick = _interopRequireDefault(require("lodash/pick"));

var _Query = _interopRequireWildcard(require("./Query"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var configKeys = ["conjunctions", "fields", "types", "operators", "widgets", "settings", "funcs"];
var ConnectedQuery = (0, _reactRedux.connect)(function (state) {
  return {
    tree: state.tree,
    __isInternalValueChange: state.__isInternalValueChange,
    __lastAction: state.__lastAction
  };
}, null, null, {
  context: _context["default"]
})(_Query["default"]);
ConnectedQuery.displayName = "ConnectedQuery";

var QueryContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(QueryContainer, _Component);

  var _super = _createSuper(QueryContainer);

  function QueryContainer(props, context) {
    var _this;

    (0, _classCallCheck2["default"])(this, QueryContainer);
    _this = _super.call(this, props, context);
    _this.shouldComponentUpdate = (0, _reactUtils.liteShouldComponentUpdate)((0, _assertThisInitialized2["default"])(_this), {
      value: function value(nextValue, prevValue, state) {
        return false;
      }
    });
    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));
    var config = (0, _pick["default"])(props, configKeys);
    var extendedConfig = (0, _configUtils.extendConfig)(config);
    var tree = props.value;
    var validatedTree = tree ? (0, _Query.validateAndFixTree)(tree, null, config, config) : null;
    var store = (0, _tree["default"])(_objectSpread(_objectSpread({}, config), {}, {
      tree: validatedTree
    }));
    _this.state = {
      store: (0, _redux.createStore)(store),
      config: extendedConfig
    };
    return _this;
  }

  (0, _createClass2["default"])(QueryContainer, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {
      var _this2 = this;

      // compare configs
      var oldConfig = (0, _pick["default"])(this.props, configKeys);
      var nextConfig = (0, _pick["default"])(nextProps, configKeys);
      var isConfigChanged = !(0, _stuff.shallowEqual)(oldConfig, nextConfig, true);

      if (isConfigChanged) {
        nextConfig = (0, _configUtils.extendConfig)(nextConfig);
        this.setState({
          config: nextConfig
        });
      } // compare trees


      var storeValue = this.state.store.getState().tree;
      var isTreeChanged = !(0, _stuff.immutableEqual)(nextProps.value, this.props.value) && !(0, _stuff.immutableEqual)(nextProps.value, storeValue);

      if (isTreeChanged) {
        var nextTree = nextProps.value || (0, _defaultUtils.defaultRoot)(_objectSpread(_objectSpread({}, nextProps), {}, {
          tree: null
        }));
        var validatedTree = (0, _Query.validateAndFixTree)(nextTree, null, nextConfig, oldConfig);
        return Promise.resolve().then(function () {
          _this2.state.store.dispatch(actions.tree.setTree(nextProps, validatedTree));
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      // `get_children` is deprecated!
      var _this$props = this.props,
          renderBuilder = _this$props.renderBuilder,
          get_children = _this$props.get_children,
          onChange = _this$props.onChange,
          settings = _this$props.settings;
      var _this$state = this.state,
          config = _this$state.config,
          store = _this$state.store;
      var QueryWrapper = settings.renderProvider;
      return /*#__PURE__*/_react["default"].createElement(QueryWrapper, {
        config: config
      }, /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: store,
        context: _context["default"]
      }, /*#__PURE__*/_react["default"].createElement(ConnectedQuery, {
        store: store,
        config: config,
        onChange: onChange,
        renderBuilder: renderBuilder || get_children
      })));
    }
  }]);
  return QueryContainer;
}(_react.Component);

exports["default"] = QueryContainer;
QueryContainer.propTypes = {
  //config
  conjunctions: _propTypes["default"].object.isRequired,
  fields: _propTypes["default"].object.isRequired,
  types: _propTypes["default"].object.isRequired,
  operators: _propTypes["default"].object.isRequired,
  widgets: _propTypes["default"].object.isRequired,
  settings: _propTypes["default"].object.isRequired,
  onChange: _propTypes["default"].func,
  renderBuilder: _propTypes["default"].func,
  value: _propTypes["default"].any //instanceOf(Immutable.Map)

};