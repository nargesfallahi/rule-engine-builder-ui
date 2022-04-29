"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePathsInTree = exports.removeIsLockedInTree = exports.isEmptyTree = exports.hasChildren = exports.getTreeBadFields = exports.getTotalRulesCountInTree = exports.getTotalReordableNodesCountInTree = exports.getSwitchValues = exports.getLightTree = exports.getItemByPath = exports.getFlatTree = exports.fixPathsInTree = exports.fixEmptyGroupsInTree = exports.expandTreeSubpath = exports.expandTreePath = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _immutable = _interopRequireDefault(require("immutable"));

/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */
var expandTreePath = function expandTreePath(path) {
  for (var _len = arguments.length, suffix = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    suffix[_key - 1] = arguments[_key];
  }

  return path.interpose("children1").withMutations(function (list) {
    list.skip(1);
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.List} path
 * @param {...string} suffix
 * @return {Immutable.List}
 */


exports.expandTreePath = expandTreePath;

var expandTreeSubpath = function expandTreeSubpath(path) {
  for (var _len2 = arguments.length, suffix = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    suffix[_key2 - 1] = arguments[_key2];
  }

  return path.interpose("children1").withMutations(function (list) {
    list.push.apply(list, suffix);
    return list;
  });
};
/**
 * @param {Immutable.Map} path
 * @param {Immutable.List} path
 * @return {Immutable.Map}
 */


exports.expandTreeSubpath = expandTreeSubpath;

var getItemByPath = function getItemByPath(tree, path) {
  var children = new _immutable["default"].OrderedMap((0, _defineProperty2["default"])({}, tree.get("id"), tree));
  var res = tree;
  path.forEach(function (id) {
    res = children.get(id);
    children = res.get("children1");
  });
  return res;
};
/**
 * Remove `path` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.getItemByPath = getItemByPath;

var removePathsInTree = function removePathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path) {
    var itemPath = path.push(item.get("id"));

    if (item.get("path")) {
      newTree = newTree.removeIn(expandTreePath(itemPath, "path"));
    }

    var children = item.get("children1");

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath);
      });
    }
  }

  _processNode(tree, new _immutable["default"].List());

  return newTree;
};
/**
 * Remove `isLocked` in items that inherit parent's `isLocked`
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.removePathsInTree = removePathsInTree;

var removeIsLockedInTree = function removeIsLockedInTree(tree) {
  var newTree = tree;

  function _processNode(item, path) {
    var isParentLocked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var itemPath = path.push(item.get("id"));
    var isLocked = item.getIn(["properties", "isLocked"]);

    if (isParentLocked && isLocked) {
      newTree = newTree.deleteIn(expandTreePath(itemPath, "properties", "isLocked"));
    }

    var children = item.get("children1");

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, itemPath, isLocked || isParentLocked);
      });
    }
  }

  _processNode(tree, new _immutable["default"].List());

  return newTree;
};
/**
 * Set correct `path` and `id` in every item
 * @param {Immutable.Map} tree
 * @return {Immutable.Map} tree
 */


exports.removeIsLockedInTree = removeIsLockedInTree;

var fixPathsInTree = function fixPathsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path, lev, nodeId) {
    if (!item) return;
    var currPath = item.get("path");
    var currId = item.get("id");
    var itemId = currId || nodeId;
    var itemPath = path.push(itemId);

    if (!currPath || !currPath.equals(itemPath)) {
      newTree = newTree.setIn(expandTreePath(itemPath, "path"), itemPath);
    }

    if (!currId) {
      newTree = newTree.setIn(expandTreePath(itemPath, "id"), itemId);
    }

    var children = item.get("children1");

    if (children) {
      if (children.constructor.name == "Map") {
        // protect: should me OrderedMap, not Map (issue #501)
        newTree = newTree.setIn(expandTreePath(itemPath, "children1"), new _immutable["default"].OrderedMap(children));
      }

      children.map(function (child, childId) {
        _processNode(child, itemPath, lev + 1, childId);
      });
    }
  }

  _processNode(tree, new _immutable["default"].List(), 0);

  return newTree;
};

exports.fixPathsInTree = fixPathsInTree;

var fixEmptyGroupsInTree = function fixEmptyGroupsInTree(tree) {
  var newTree = tree;

  function _processNode(item, path, lev, nodeId) {
    if (!item) return false;
    var itemId = item.get("id") || nodeId;
    var itemPath = path.push(itemId);
    var children = item.get("children1");

    if (children) {
      var allChildrenGone = children.map(function (child, childId) {
        return _processNode(child, itemPath, lev + 1, childId);
      }).reduce(function (curr, v) {
        return curr && v;
      }, true);

      if ((children.size == 0 || allChildrenGone) && lev > 0) {
        newTree = newTree.deleteIn(expandTreePath(itemPath));
        return true;
      }
    }

    return false;
  }

  _processNode(tree, new _immutable["default"].List(), 0);

  return newTree;
};
/**
 * @param {Immutable.Map} tree
 * @return {Object} {flat, items}
 */


exports.fixEmptyGroupsInTree = fixEmptyGroupsInTree;

var getFlatTree = function getFlatTree(tree) {
  var flat = [];
  var items = {};
  var realHeight = 0;

  function _flatizeTree(item, path, insideCollapsed, insideLocked, insideRuleGroup, lev, info, parentType, caseId) {
    var type = item.get("type");
    var collapsed = item.get("collapsed");
    var id = item.get("id");
    var children = item.get("children1");
    var isLocked = item.getIn(["properties", "isLocked"]);
    var childrenIds = children ? children.map(function (_child, childId) {
      return childId;
    }) : null;
    var isRuleGroup = type == "rule_group"; // tip: count rule_group as 1 rule

    var isLeaf = !insideRuleGroup && (!children || isRuleGroup);
    var itemsBefore = flat.length;
    var top = realHeight;
    flat.push(id);
    if (!insideCollapsed) realHeight += 1;
    info.height = (info.height || 0) + 1;
    items[id] = {
      type: type,
      parent: path.length ? path[path.length - 1] : null,
      parentType: parentType,
      caseId: type == "case_group" ? id : caseId,
      isDefaultCase: type == "case_group" && !children,
      path: path.concat(id),
      lev: lev,
      leaf: !children,
      index: itemsBefore,
      id: id,
      children: childrenIds,
      leafsCount: 0,
      _top: itemsBefore,
      _height: itemsAfter - itemsBefore,
      top: insideCollapsed ? null : top,
      height: height,
      bottom: (insideCollapsed ? null : top) + height,
      collapsed: collapsed,
      node: item,
      isLocked: isLocked || insideLocked
    };

    if (children) {
      var subinfo = {};
      children.map(function (child, _childId) {
        _flatizeTree(child, path.concat(id), insideCollapsed || collapsed, insideLocked || isLocked, insideRuleGroup || isRuleGroup, lev + 1, subinfo, type, type == "case_group" ? id : caseId);
      });

      if (!collapsed) {
        info.height = (info.height || 0) + (subinfo.height || 0);
      }
    }

    if (caseId && isLeaf) {
      items[caseId].leafsCount++;
    }

    var itemsAfter = flat.length;
    var _bottom = realHeight;
    var height = info.height;
    Object.assign(items[id], {
      _height: itemsAfter - itemsBefore,
      height: height,
      bottom: (insideCollapsed ? null : top) + height
    });
  }

  _flatizeTree(tree, [], false, false, false, 0, {}, null, null);

  for (var i = 0; i < flat.length; i++) {
    var prevId = i > 0 ? flat[i - 1] : null;
    var nextId = i < flat.length - 1 ? flat[i + 1] : null;
    var item = items[flat[i]];
    item.prev = prevId;
    item.next = nextId;
  }

  return {
    flat: flat,
    items: items
  };
};
/**
 * Returns count of reorderable(!) nodes
 * @param {Immutable.Map} tree
 * @return {Integer}
 */


exports.getFlatTree = getFlatTree;

var getTotalReordableNodesCountInTree = function getTotalReordableNodesCountInTree(tree) {
  if (!tree) return -1;
  var cnt = 0;

  function _processNode(item, path, lev) {
    var id, children, type;

    if (typeof item.get === "function") {
      id = item.get("id");
      children = item.get("children1");
      type = item.get("type");
    } else {
      id = item.id;
      children = item.children1;
      type = item.type;
    }

    var isRuleGroup = type == "rule_group";
    cnt++; //tip: rules in rule-group can be reordered only inside

    if (children && !isRuleGroup) {
      children.map(function (child, _childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  _processNode(tree, [], 0);

  return cnt - 1; // -1 for root
};
/**
 * Returns count of rules (leafs, i.e. don't count groups)
 * @param {Immutable.Map} tree
 * @return {Integer}
 */


exports.getTotalReordableNodesCountInTree = getTotalReordableNodesCountInTree;

var getTotalRulesCountInTree = function getTotalRulesCountInTree(tree) {
  if (!tree) return -1;
  var cnt = 0;

  function _processNode(item, path, lev) {
    var id, children, type;

    if (typeof item.get === "function") {
      id = item.get("id");
      children = item.get("children1");
      type = item.get("type");
    } else {
      id = item.id;
      children = item.children1;
      type = item.type;
    }

    if (type == "rule" || type == "rule_group") {
      // tip: count rule_group as 1 rule
      cnt++;
    } else if (children) {
      children.map(function (child, _childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  _processNode(tree, [], 0);

  return cnt;
};

exports.getTotalRulesCountInTree = getTotalRulesCountInTree;

var getTreeBadFields = function getTreeBadFields(tree) {
  var badFields = [];

  function _processNode(item, path, lev) {
    var id = item.get("id");
    var children = item.get("children1");
    var valueError = item.getIn(["properties", "valueError"]);
    var field = item.getIn(["properties", "field"]);

    if (valueError && valueError.size > 0 && valueError.filter(function (v) {
      return v != null;
    }).size > 0) {
      badFields.push(field);
    }

    if (children) {
      children.map(function (child, _childId) {
        _processNode(child, path.concat(id), lev + 1);
      });
    }
  }

  if (tree) _processNode(tree, [], 0);
  return Array.from(new Set(badFields));
}; // Remove fields that can be calced: "id", "path"
// Remove empty fields: "operatorOptions"


exports.getTreeBadFields = getTreeBadFields;

var getLightTree = function getLightTree(tree) {
  var children1AsArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var newTree = tree;

  function _processNode(item, itemId) {
    if (item.path) delete item.path;
    if (!children1AsArray && itemId) delete item.id;
    var properties = item.properties;

    if (properties) {
      if (properties.operatorOptions == null) delete properties.operatorOptions;
    }

    var children = item.children1;

    if (children) {
      for (var id in children) {
        _processNode(children[id], id);
      }

      if (children1AsArray) {
        item.children1 = Object.values(children);
      }
    }
  }

  _processNode(tree, null);

  return newTree;
};

exports.getLightTree = getLightTree;

var getSwitchValues = function getSwitchValues(tree) {
  var vals = [];
  var children = tree.get("children1");

  if (children) {
    children.map(function (child) {
      var value = child.getIn(["properties", "value"]);
      var caseValue;

      if (value && value.size == 1) {
        caseValue = value.get(0);

        if (Array.isArray(caseValue) && caseValue.length == 0) {
          caseValue = null;
        }
      } else {
        caseValue = null;
      }

      vals = [].concat((0, _toConsumableArray2["default"])(vals), [caseValue]);
    });
  }

  return vals;
};

exports.getSwitchValues = getSwitchValues;

var isEmptyTree = function isEmptyTree(tree) {
  return !tree.get("children1") || tree.get("children1").size == 0;
};

exports.isEmptyTree = isEmptyTree;

var hasChildren = function hasChildren(tree, path) {
  return tree.getIn(expandTreePath(path, "children1")).size > 0;
};

exports.hasChildren = hasChildren;