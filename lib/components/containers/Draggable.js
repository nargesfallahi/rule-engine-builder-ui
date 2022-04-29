"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["isDraggingTempo", "isDraggingMe", "dragging"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var classNames = require("classnames");

var _default = function _default(className) {
  return function (GroupOrRule) {
    var _class;

    return _class = /*#__PURE__*/function (_PureComponent) {
      (0, _inherits2["default"])(Draggable, _PureComponent);

      var _super = _createSuper(Draggable);

      function Draggable(props) {
        var _this;

        (0, _classCallCheck2["default"])(this, Draggable);
        _this = _super.call(this, props);

        _this.handleDraggerMouseDown = function (e) {
          var nodeId = _this.props.id;
          var dom = _this.wrapper.current;

          if (_this.props.onDragStart) {
            _this.props.onDragStart(nodeId, dom, e);
          }
        };

        _this.wrapper = /*#__PURE__*/_react["default"].createRef();
        return _this;
      }

      (0, _createClass2["default"])(Draggable, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              isDraggingTempo = _this$props.isDraggingTempo,
              isDraggingMe = _this$props.isDraggingMe,
              dragging = _this$props.dragging,
              otherProps = (0, _objectWithoutProperties2["default"])(_this$props, _excluded);
          var isTrueLocked = otherProps.isTrueLocked;
          var styles = {};

          if (isDraggingMe && isDraggingTempo) {
            styles = {
              top: dragging.y,
              left: dragging.x,
              width: dragging.w
            };
          }

          var cn = classNames(className, "group-or-rule", isDraggingMe && isDraggingTempo ? "qb-draggable" : null, isDraggingMe && !isDraggingTempo ? "qb-placeholder" : null, isTrueLocked ? "locked" : null);
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: cn,
            style: styles,
            ref: this.wrapper,
            "data-id": this.props.id
          }, /*#__PURE__*/_react["default"].createElement(GroupOrRule, (0, _extends2["default"])({
            handleDraggerMouseDown: this.handleDraggerMouseDown,
            isDraggingMe: isDraggingMe,
            isDraggingTempo: isDraggingTempo
          }, otherProps)));
        }
      }]);
      return Draggable;
    }(_react.PureComponent), _class.propTypes = {
      isDraggingTempo: _propTypes["default"].bool,
      isDraggingMe: _propTypes["default"].bool,
      onDragStart: _propTypes["default"].func,
      dragging: _propTypes["default"].object,
      //{id, x, y, w, h}
      isLocked: _propTypes["default"].bool,
      isTrueLocked: _propTypes["default"].bool
    }, _class;
  };
};

exports["default"] = _default;