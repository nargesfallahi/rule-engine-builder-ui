"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _treeUtils = require("../../utils/treeUtils");

var _stuff = require("../../utils/stuff");

var _context = _interopRequireDefault(require("../../stores/context"));

var constants = _interopRequireWildcard(require("../../constants"));

var _clone = _interopRequireDefault(require("clone"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var actions = _interopRequireWildcard(require("../../actions"));

var _reactUtils = require("../../utils/reactUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var createSortableContainer = function createSortableContainer(Builder) {
  var _class;

  var CanMoveFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return _class = /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(SortableContainer, _Component);

    var _super = _createSuper(SortableContainer);

    function SortableContainer(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, SortableContainer);
      _this = _super.call(this, props);

      _this._getEventTarget = function (e, dragStart) {
        return e && e.__mocked_window || document.body || window;
      };

      _this.onDragStart = function (id, dom, e) {
        var treeEl = dom.closest(".query-builder");
        document.body.classList.add("qb-dragging");
        treeEl.classList.add("qb-dragging");
        var treeElContainer = treeEl.closest(".query-builder-container") || treeEl;
        treeElContainer = _this._getScrollParent(treeElContainer) || document.body;
        var scrollTop = treeElContainer.scrollTop;

        var _dragEl = _this._getDraggableNodeEl(treeEl);

        var _plhEl = _this._getPlaceholderNodeEl(treeEl);

        var tmpAllGroups = treeEl.querySelectorAll(".group--children");
        var anyGroup = tmpAllGroups.length ? tmpAllGroups[0] : null;
        var groupPadding;

        if (anyGroup) {
          groupPadding = window.getComputedStyle(anyGroup, null).getPropertyValue("padding-left");
          groupPadding = parseInt(groupPadding);
        }

        var dragging = {
          id: id,
          x: dom.offsetLeft,
          y: dom.offsetTop,
          w: dom.offsetWidth,
          h: dom.offsetHeight,
          itemInfo: _this.tree.items[id],
          paddingLeft: groupPadding
        };
        var dragStart = {
          id: id,
          x: dom.offsetLeft,
          y: dom.offsetTop,
          scrollTop: scrollTop,
          clientX: e.clientX,
          clientY: e.clientY,
          itemInfo: (0, _clone["default"])(_this.tree.items[id]),
          treeEl: treeEl,
          treeElContainer: treeElContainer
        };
        var mousePos = {
          clientX: e.clientX,
          clientY: e.clientY
        };

        var target = _this._getEventTarget(e, dragStart);

        _this.eventTarget = target;
        target.addEventListener("mousemove", _this.onDrag);
        target.addEventListener("mouseup", _this.onDragEnd);

        _this.props.setDragStart(dragStart, dragging, mousePos);
      };

      _this.onDrag = function (e) {
        var doHandleDrag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var dragging = Object.assign({}, _this.props.dragging);
        var startDragging = _this.props.dragStart;
        var paddingLeft = dragging.paddingLeft; //this.props.paddingLeft;

        var treeElContainer = startDragging.treeElContainer;
        var scrollTop = treeElContainer.scrollTop;
        dragging.itemInfo = _this.tree.items[dragging.id];

        if (!dragging.itemInfo) {
          return;
        }

        var mousePos = {
          clientX: e.clientX,
          clientY: e.clientY
        };
        var startMousePos = {
          clientX: startDragging.clientX,
          clientY: startDragging.clientY
        };

        if (e.__mock_dom) {
          var treeEl = startDragging.treeEl;

          var dragEl = _this._getDraggableNodeEl(treeEl);

          var plhEl = _this._getPlaceholderNodeEl(treeEl);

          e.__mock_dom({
            treeEl: treeEl,
            dragEl: dragEl,
            plhEl: plhEl
          });
        } //first init plX/plY


        if (!startDragging.plX) {
          var _treeEl = startDragging.treeEl;

          var _plhEl2 = _this._getPlaceholderNodeEl(_treeEl);

          if (_plhEl2) {
            startDragging.plX = _plhEl2.getBoundingClientRect().left + window.scrollX;
            startDragging.plY = _plhEl2.getBoundingClientRect().top + window.scrollY;
          }
        }

        var startX = startDragging.x;
        var startY = startDragging.y;
        var startClientX = startDragging.clientX;
        var startClientY = startDragging.clientY;
        var startScrollTop = startDragging.scrollTop;
        var pos = {
          x: startX + (e.clientX - startClientX),
          y: startY + (e.clientY - startClientY) + (scrollTop - startScrollTop)
        };
        dragging.x = pos.x;
        dragging.y = pos.y;
        dragging.paddingLeft = paddingLeft;
        dragging.mousePos = mousePos;
        dragging.startMousePos = startMousePos;

        _this.props.setDragProgress(mousePos, dragging);

        var moved = doHandleDrag ? _this.handleDrag(dragging, e, CanMoveFn) : false;

        if (!moved) {
          if (e.preventDefault) e.preventDefault();
        }
      };

      _this.onDragEnd = function () {
        var treeEl = _this.props.dragStart.treeEl;

        _this.props.setDragEnd();

        treeEl.classList.remove("qb-dragging");
        document.body.classList.remove("qb-dragging");
        _this._cacheEls = {};

        var target = _this.eventTarget || _this._getEventTarget();

        target.removeEventListener("mousemove", _this.onDrag);
        target.removeEventListener("mouseup", _this.onDragEnd);
      };

      (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

      _this.onPropsChanged(props);

      return _this;
    }

    (0, _createClass2["default"])(SortableContainer, [{
      key: "onPropsChanged",
      value: function onPropsChanged(nextProps) {
        this.tree = (0, _treeUtils.getFlatTree)(nextProps.tree);
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        var prevProps = this.props;
        var prevState = this.state;
        var should = (0, _reactUtils.pureShouldComponentUpdate)(this)(nextProps, nextState);

        if (should) {
          if (prevState == nextState && prevProps != nextProps) {
            var chs = [];

            for (var k in nextProps) {
              var changed = nextProps[k] != prevProps[k];

              if (changed) {
                //don't render <Builder> on dragging - appropriate redux-connected components will do it
                if (k != "dragging" && k != "mousePos") chs.push(k);
              }
            }

            if (!chs.length) should = false;
          }
        }

        return should;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(_prevProps, _prevState) {
        var dragging = this.props.dragging;
        var startDragging = this.props.dragStart;

        if (startDragging && startDragging.id) {
          dragging.itemInfo = this.tree.items[dragging.id];

          if (dragging.itemInfo) {
            if (dragging.itemInfo.index != startDragging.itemInfo.index || dragging.itemInfo.parent != startDragging.itemInfo.parent) {
              var treeEl = startDragging.treeEl;
              var treeElContainer = startDragging.treeElContainer;

              var plhEl = this._getPlaceholderNodeEl(treeEl, true);

              if (plhEl) {
                var plX = plhEl.getBoundingClientRect().left + window.scrollX;
                var plY = plhEl.getBoundingClientRect().top + window.scrollY;
                var oldPlX = startDragging.plX;
                var oldPlY = startDragging.plY;
                var scrollTop = treeElContainer.scrollTop;
                startDragging.plX = plX;
                startDragging.plY = plY;
                startDragging.itemInfo = (0, _clone["default"])(dragging.itemInfo);
                startDragging.y = plhEl.offsetTop;
                startDragging.x = plhEl.offsetLeft;
                startDragging.clientY += plY - oldPlY;
                startDragging.clientX += plX - oldPlX;
                if (treeElContainer != document.body) startDragging.scrollTop = scrollTop;
                this.onDrag(this.props.mousePos, false);
              }
            }
          }
        }
      }
    }, {
      key: "_getNodeElById",
      value: function _getNodeElById(treeEl, indexId) {
        var ignoreCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (indexId == null) return null;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls[indexId];
        if (el && document.contains(el) && !ignoreCache) return el;
        el = treeEl.querySelector('.group-or-rule-container[data-id="' + indexId + '"]');
        this._cacheEls[indexId] = el;
        return el;
      }
    }, {
      key: "_getDraggableNodeEl",
      value: function _getDraggableNodeEl(treeEl) {
        var ignoreCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls["draggable"];
        if (el && document.contains(el) && !ignoreCache) return el;
        var els = treeEl.getElementsByClassName("qb-draggable");
        el = els.length ? els[0] : null;
        this._cacheEls["draggable"] = el;
        return el;
      }
    }, {
      key: "_getPlaceholderNodeEl",
      value: function _getPlaceholderNodeEl(treeEl) {
        var ignoreCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!this._cacheEls) this._cacheEls = {};
        var el = this._cacheEls["placeholder"];
        if (el && document.contains(el) && !ignoreCache) return el;
        var els = treeEl.getElementsByClassName("qb-placeholder");
        el = els.length ? els[0] : null;
        this._cacheEls["placeholder"] = el;
        return el;
      }
    }, {
      key: "_isScrollable",
      value: function _isScrollable(node) {
        var overflowY = window.getComputedStyle(node)["overflow-y"];
        return (overflowY === "scroll" || overflowY === "auto") && node.scrollHeight > node.offsetHeight;
      }
    }, {
      key: "_getScrollParent",
      value: function _getScrollParent(node) {
        if (node == null) return null;

        if (node === document.body || this._isScrollable(node)) {
          return node;
        } else {
          return this._getScrollParent(node.parentNode);
        }
      }
    }, {
      key: "handleDrag",
      value: function handleDrag(dragInfo, e, canMoveFn) {
        var _this2 = this;

        var canMoveBeforeAfterGroup = true;
        var itemInfo = dragInfo.itemInfo;
        var paddingLeft = dragInfo.paddingLeft;
        var moveInfo = null;
        var treeEl = this.props.dragStart.treeEl;
        var dragId = dragInfo.id;

        var dragEl = this._getDraggableNodeEl(treeEl);

        var plhEl = this._getPlaceholderNodeEl(treeEl);

        var dragRect, plhRect, hovRect, treeRect;

        if (dragEl && plhEl) {
          dragRect = dragEl.getBoundingClientRect();
          plhRect = plhEl.getBoundingClientRect();

          if (!plhRect.width) {
            return;
          }

          var dragDirs = {
            hrz: 0,
            vrt: 0
          };
          if (dragRect.top < plhRect.top) dragDirs.vrt = -1; //up
          else if (dragRect.bottom > plhRect.bottom) dragDirs.vrt = +1; //down

          if (dragRect.left > plhRect.left) dragDirs.hrz = +1; //right
          else if (dragRect.left < plhRect.left) dragDirs.hrz = -1; //left

          treeRect = treeEl.getBoundingClientRect();
          var trgCoord = {
            x: treeRect.left + (treeRect.right - treeRect.left) / 2,
            y: dragDirs.vrt >= 0 ? dragRect.bottom : dragRect.top
          };
          var hovCNodeEl;

          if (e.__mocked_hov_container) {
            hovCNodeEl = e.__mocked_hov_container;
          } else {
            var hovNodeEl = document.elementFromPoint(trgCoord.x, trgCoord.y - 1);
            hovCNodeEl = hovNodeEl ? hovNodeEl.closest(".group-or-rule-container") : null;

            if (!hovCNodeEl && hovNodeEl && hovNodeEl.classList.contains("query-builder-container")) {
              var _hovNodeEl$firstChild;

              // fix 2022-01-24 - get root .group-or-rule-container
              var rootGroupContainer = hovNodeEl === null || hovNodeEl === void 0 ? void 0 : (_hovNodeEl$firstChild = hovNodeEl.firstChild) === null || _hovNodeEl$firstChild === void 0 ? void 0 : _hovNodeEl$firstChild.firstChild;

              if (rootGroupContainer && rootGroupContainer.classList.contains("group-or-rule-container")) {
                hovCNodeEl = rootGroupContainer;
              }
            }
          }

          if (!hovCNodeEl) {
            _stuff.logger.log("out of tree bounds!");
          } else {
            var isGroup = hovCNodeEl.classList.contains("group-container");
            var hovNodeId = hovCNodeEl.getAttribute("data-id");
            var hovEl = hovCNodeEl;
            var doAppend = false;
            var doPrepend = false;

            if (hovEl) {
              hovRect = hovEl.getBoundingClientRect();
              var hovHeight = hovRect.bottom - hovRect.top;
              var hovII = this.tree.items[hovNodeId];
              var trgRect = null,
                  trgEl = null,
                  trgII = null,
                  altII = null; //for canMoveBeforeAfterGroup

              if (dragDirs.vrt == 0) {
                trgII = itemInfo;
                trgEl = plhEl;
                if (trgEl) trgRect = trgEl.getBoundingClientRect();
              } else {
                if (isGroup) {
                  if (dragDirs.vrt > 0) {
                    //down
                    //take group header (for prepend only)
                    var hovInnerEl = hovCNodeEl.getElementsByClassName("group--header");
                    var hovEl2 = hovInnerEl.length ? hovInnerEl[0] : null;

                    if (hovEl2) {
                      var hovRect2 = hovEl2.getBoundingClientRect();
                      var hovHeight2 = hovRect2.bottom - hovRect2.top;
                      var isOverHover = dragRect.bottom - hovRect2.top > hovHeight2 * 3 / 4;

                      if (isOverHover && hovII.top > dragInfo.itemInfo.top) {
                        trgII = hovII;
                        trgRect = hovRect2;
                        trgEl = hovEl2;
                        doPrepend = true;
                      }
                    }
                  } else if (dragDirs.vrt < 0) {
                    //up
                    if (hovII.lev >= itemInfo.lev) {
                      //take whole group
                      var isClimbToHover = hovRect.bottom - dragRect.top >= 2;

                      if (isClimbToHover && hovII.top < dragInfo.itemInfo.top) {
                        trgII = hovII;
                        trgRect = hovRect;
                        trgEl = hovEl;
                        doAppend = true;
                      }
                    }
                  }

                  if (!doPrepend && !doAppend || canMoveBeforeAfterGroup) {
                    //take whole group and check if we can move before/after group
                    var _isOverHover = dragDirs.vrt < 0 //up
                    ? hovRect.bottom - dragRect.top > hovHeight - 5 : dragRect.bottom - hovRect.top > hovHeight - 5;

                    if (_isOverHover) {
                      if (!doPrepend && !doAppend) {
                        trgII = hovII;
                        trgRect = hovRect;
                        trgEl = hovEl;
                      }

                      if (canMoveBeforeAfterGroup) {
                        altII = hovII;
                      }
                    }
                  }
                } else {
                  //check if we can move before/after group
                  var _isOverHover2 = dragDirs.vrt < 0 //up
                  ? hovRect.bottom - dragRect.top > hovHeight / 2 : dragRect.bottom - hovRect.top > hovHeight / 2;

                  if (_isOverHover2) {
                    trgII = hovII;
                    trgRect = hovRect;
                    trgEl = hovEl;
                  }
                }
              }

              var isSamePos = trgII && trgII.id == dragId;

              if (trgRect) {
                var dragLeftOffset = dragRect.left - treeRect.left;
                var trgLeftOffset = trgRect.left - treeRect.left;

                var _trgLev = trgLeftOffset / paddingLeft;

                var dragLev = Math.max(0, Math.round(dragLeftOffset / paddingLeft)); //find all possible moves

                var availMoves = [];
                var altMoves = []; //alternatively can move after/before group, if can't move into it

                if (isSamePos) {//do nothing
                } else {
                  if (isGroup) {
                    if (doAppend) {
                      availMoves.push([constants.PLACEMENT_APPEND, trgII, trgII.lev + 1]);
                    } else if (doPrepend) {
                      availMoves.push([constants.PLACEMENT_PREPEND, trgII, trgII.lev + 1]);
                    } //alt


                    if (canMoveBeforeAfterGroup && altII) {
                      // fix 2022-01-24: do prepend/append instead of before/after for root
                      var isToRoot = altII.lev == 0; // fix 2022-01-25: fix prepend/append instead of before/after for case_group

                      var isToCase = altII.type == "case_group" && itemInfo.type != "case_group";
                      var prevCaseId = altII.prev && this.tree.items[altII.prev].caseId;
                      var nextCaseId = altII.next && this.tree.items[altII.next].caseId;
                      if (itemInfo.caseId == prevCaseId) prevCaseId = null;
                      if (itemInfo.caseId == nextCaseId) nextCaseId = null;
                      var prevCase = prevCaseId && this.tree.items[prevCaseId];
                      var nextCase = nextCaseId && this.tree.items[nextCaseId];

                      if (dragDirs.vrt > 0) {
                        //down
                        if (isToRoot) {
                          altMoves.push([constants.PLACEMENT_APPEND, altII, altII.lev + 1]);
                        } else if (isToCase && nextCase) {
                          altMoves.push([constants.PLACEMENT_PREPEND, nextCase, nextCase.lev + 1]);
                        } else {
                          altMoves.push([constants.PLACEMENT_AFTER, altII, altII.lev]);
                        }
                      } else if (dragDirs.vrt < 0) {
                        //up
                        if (isToRoot) {
                          altMoves.push([constants.PLACEMENT_PREPEND, altII, altII.lev + 1]);
                        } else if (isToCase && prevCase) {
                          altMoves.push([constants.PLACEMENT_APPEND, prevCase, prevCase.lev + 1]);
                        } else {
                          altMoves.push([constants.PLACEMENT_BEFORE, altII, altII.lev]);
                        }
                      }
                    }
                  }

                  if (!doAppend && !doPrepend) {
                    if (dragDirs.vrt < 0) {
                      //up
                      availMoves.push([constants.PLACEMENT_BEFORE, trgII, trgII.lev]);
                    } else if (dragDirs.vrt > 0) {
                      //down
                      availMoves.push([constants.PLACEMENT_AFTER, trgII, trgII.lev]);
                    }
                  }
                } //add case


                var addCaseII = function addCaseII(am) {
                  var toII = am[1];
                  var fromCaseII = itemInfo.caseId ? _this2.tree.items[itemInfo.caseId] : null;
                  var toCaseII = toII.caseId ? _this2.tree.items[toII.caseId] : null;
                  return [].concat((0, _toConsumableArray2["default"])(am), [fromCaseII, toCaseII]);
                };

                availMoves = availMoves.map(addCaseII);
                altMoves = altMoves.map(addCaseII); //sanitize

                availMoves = availMoves.filter(function (am) {
                  var placement = am[0];
                  var trg = am[1];
                  if ((placement == constants.PLACEMENT_BEFORE || placement == constants.PLACEMENT_AFTER) && trg.parent == null) return false;
                  if (trg.collapsed && (placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND)) return false;
                  var isInside = trg.id == itemInfo.id;

                  if (!isInside) {
                    var tmp = trg;

                    while (tmp.parent) {
                      tmp = _this2.tree.items[tmp.parent];

                      if (tmp.id == itemInfo.id) {
                        isInside = true;
                        break;
                      }
                    }
                  }

                  return !isInside;
                }).map(function (am) {
                  var placement = am[0],
                      toII = am[1],
                      _lev = am[2],
                      _fromCaseII = am[3],
                      _toCaseII = am[4];
                  var toParentII = null;
                  if (placement == constants.PLACEMENT_APPEND || placement == constants.PLACEMENT_PREPEND) toParentII = toII;else toParentII = _this2.tree.items[toII.parent];
                  if (toParentII && toParentII.parent == null) toParentII = null;
                  am[5] = toParentII;
                  return am;
                });
                var bestMode = null;
                var filteredMoves = availMoves.filter(function (am) {
                  return _this2.canMove(itemInfo, am[1], am[0], am[3], am[4], am[5], canMoveFn);
                });

                if (canMoveBeforeAfterGroup && filteredMoves.length == 0 && altMoves.length > 0) {
                  filteredMoves = altMoves.filter(function (am) {
                    return _this2.canMove(itemInfo, am[1], am[0], am[3], am[4], am[5], canMoveFn);
                  });
                }

                var levs = filteredMoves.map(function (am) {
                  return am[2];
                });
                var curLev = itemInfo.lev;
                var allLevs = levs.concat(curLev);
                var closestDragLev = null;
                if (allLevs.indexOf(dragLev) != -1) closestDragLev = dragLev;else if (dragLev > Math.max.apply(Math, (0, _toConsumableArray2["default"])(allLevs))) closestDragLev = Math.max.apply(Math, (0, _toConsumableArray2["default"])(allLevs));else if (dragLev < Math.min.apply(Math, (0, _toConsumableArray2["default"])(allLevs))) closestDragLev = Math.min.apply(Math, (0, _toConsumableArray2["default"])(allLevs));
                bestMode = filteredMoves.find(function (am) {
                  return am[2] == closestDragLev;
                });
                if (!isSamePos && !bestMode && filteredMoves.length) bestMode = filteredMoves[0];
                moveInfo = bestMode;
              }
            }
          }
        }

        if (moveInfo) {
          this.move(itemInfo, moveInfo[1], moveInfo[0], moveInfo[3]); // logger.log("DRAG-N-DROP", JSON.stringify({
          //   dragRect,
          //   plhRect,
          //   treeRect,
          //   hovRect,
          //   startMousePos: dragInfo.startMousePos,
          //   mousePos: dragInfo.mousePos,
          // }));

          return true;
        }

        return false;
      }
    }, {
      key: "canMove",
      value: function canMove(fromII, toII, placement, fromCaseII, toCaseII, toParentII, canMoveFn) {
        if (!fromII || !toII) return false;
        if (fromII.id === toII.id) return false;
        var _this$props$config$se = this.props.config.settings,
            canRegroup = _this$props$config$se.canRegroup,
            canRegroupCases = _this$props$config$se.canRegroupCases,
            maxNesting = _this$props$config$se.maxNesting,
            maxNumberOfRules = _this$props$config$se.maxNumberOfRules,
            canLeaveEmptyCase = _this$props$config$se.canLeaveEmptyCase;
        var newLev = toParentII ? toParentII.lev + 1 : toII.lev;
        var isBeforeAfter = placement == constants.PLACEMENT_BEFORE || placement == constants.PLACEMENT_AFTER;
        var isPend = placement == constants.PLACEMENT_PREPEND || placement == constants.PLACEMENT_APPEND;
        var isLev1 = isBeforeAfter && toII.lev == 1 || isPend && toII.lev == 0;
        var isParentChange = fromII.parent != toII.parent;
        var isStructChange = isPend || isParentChange; // can't move `case_group` anywhere but before/after anoter `case_group`

        var isForbiddenStructChange = fromII.type == "case_group" && !isLev1 // can't restruct `rule_group`
        || fromII.parentType == "rule_group" || toII.type == "rule_group" || toII.parentType == "rule_group" // only `case_group` can be placed under `switch_group`
        || fromII.type != "case_group" && toII.type == "case_group" && isBeforeAfter || fromII.type != "case_group" && toII.type == "switch_group" // can't move rule/group to another case
        || !canRegroupCases && fromII.caseId != toII.caseId;
        var isLockedChange = toII.isLocked || fromII.isLocked || toParentII && toParentII.isLocked;
        if (maxNesting && newLev > maxNesting) return false;
        if (isStructChange && (!canRegroup || isForbiddenStructChange || isLockedChange)) return false;

        if (fromII.type != "case_group" && fromII.caseId != toII.caseId) {
          var isLastFromCase = fromCaseII ? fromCaseII._height == 2 : false;
          var newRulesInTargetCase = toCaseII ? toCaseII.leafsCount + 1 : 0;
          if (maxNumberOfRules && newRulesInTargetCase > maxNumberOfRules) return false;
          if (isLastFromCase && !canLeaveEmptyCase) return false;
        }

        if (fromII.type == "case_group" && (fromII.isDefaultCase || toII.isDefaultCase || toII.type == "switch_group" && placement == constants.PLACEMENT_APPEND)) {
          // leave default case alone
          return false;
        }

        var res = true;

        if (canMoveFn) {
          res = canMoveFn(fromII.node.toJS(), toII.node.toJS(), placement, toParentII ? toParentII.node.toJS() : null);
        }

        return res;
      }
    }, {
      key: "move",
      value: function move(fromII, toII, placement, toParentII) {
        //logger.log("move", fromII, toII, placement, toParentII);
        this.props.actions.moveItem(fromII.path, toII.path, placement);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(Builder, (0, _extends2["default"])({}, this.props, {
          onDragStart: this.onDragStart
        }));
      }
    }]);
    return SortableContainer;
  }(_react.Component), _class.propTypes = {
    tree: _propTypes["default"].any.isRequired,
    //instanceOf(Immutable.Map)
    actions: _propTypes["default"].object.isRequired // {moveItem: Function, ..}
    //... see Builder

  }, _class;
};

var _default = function _default(Builder) {
  var CanMoveFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var ConnectedSortableContainer = (0, _reactRedux.connect)(function (state) {
    return {
      dragging: state.dragging,
      dragStart: state.dragStart,
      mousePos: state.mousePos
    };
  }, {
    setDragStart: actions.drag.setDragStart,
    setDragProgress: actions.drag.setDragProgress,
    setDragEnd: actions.drag.setDragEnd
  }, null, {
    context: _context["default"]
  })(createSortableContainer(Builder, CanMoveFn));
  ConnectedSortableContainer.displayName = "ConnectedSortableContainer";
  return ConnectedSortableContainer;
};

exports["default"] = _default;