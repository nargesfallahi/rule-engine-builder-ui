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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireWildcard(require("immutable"));

var _Item = require("./item/Item");

var _SortableContainer = _interopRequireDefault(require("./containers/SortableContainer"));

var _treeUtils = require("../utils/treeUtils");

var _uuid = _interopRequireDefault(require("../utils/uuid"));

var _reactUtils = require("../utils/reactUtils");

var _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Builder = (0, _SortableContainer["default"])(_class = (_class2 = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Builder, _Component);

  var _super = _createSuper(Builder);

  function Builder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Builder);
    _this = _super.call(this, props);

    _this._updPath(props);

    return _this;
  }

  (0, _createClass2["default"])(Builder, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var prevProps = this.props;
      var should = (0, _reactUtils.pureShouldComponentUpdate)(this)(nextProps, nextState);

      if (should) {
        var chs = [];

        for (var k in nextProps) {
          var changed = nextProps[k] !== prevProps[k];

          if (changed && k != "__isInternalValueChange") {
            chs.push(k);
          }
        }

        if (!chs.length) should = false; //optimize render

        if (chs.length == 1 && chs[0] == "tree" && nextProps.__isInternalValueChange) should = false;
      }

      return should;
    }
  }, {
    key: "_updPath",
    value: function _updPath(props) {
      var id = props.tree.get("id");
      this.path = _immutable["default"].List.of(id);
    }
  }, {
    key: "render",
    value: function render() {
      var tree = this.props.tree;
      var rootType = tree.get("type");
      var isTernary = rootType == "switch_group";
      var reordableNodesCnt = isTernary ? null : (0, _treeUtils.getTotalReordableNodesCountInTree)(tree);
      var totalRulesCnt = isTernary ? null : (0, _treeUtils.getTotalRulesCountInTree)(tree);
      var id = tree.get("id");
      return /*#__PURE__*/_react["default"].createElement(_Item.Item, {
        key: id,
        id: id,
        path: this.path,
        type: rootType,
        properties: tree.get("properties") || new _immutable.Map(),
        config: this.props.config,
        actions: this.props.actions,
        children1: tree.get("children1") || new _immutable.Map() //tree={tree}
        ,
        reordableNodesCnt: reordableNodesCnt,
        totalRulesCnt: totalRulesCnt,
        parentReordableNodesCnt: 0,
        onDragStart: this.props.onDragStart
      });
    }
  }]);
  return Builder;
}(_react.Component), _class2.propTypes = {
  tree: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  config: _propTypes["default"].object.isRequired,
  actions: _propTypes["default"].object.isRequired,
  onDragStart: _propTypes["default"].func
}, _class2)) || _class;

exports["default"] = Builder;