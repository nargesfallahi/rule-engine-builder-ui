"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcTextWidth = exports.SELECT_WIDTH_OFFSET_RIGHT = exports.BUILT_IN_PLACEMENTS = void 0;
var SELECT_WIDTH_OFFSET_RIGHT = 48;
exports.SELECT_WIDTH_OFFSET_RIGHT = SELECT_WIDTH_OFFSET_RIGHT;
var DEFAULT_FONT_SIZE = "14px";
var DEFAULT_FONT_FAMILY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ["bl", "tl"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ["br", "tr"],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};
exports.BUILT_IN_PLACEMENTS = BUILT_IN_PLACEMENTS;

var calcTextWidth = function calcTextWidth(str) {
  var fontFamily = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FONT_FAMILY;
  var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FONT_SIZE;
  var div = document.createElement("div");
  div.innerHTML = str;
  var css = {
    "position": "absolute",
    "float": "left",
    "white-space": "nowrap",
    "visibility": "hidden",
    "font-size": fontSize,
    "font-family": fontFamily
  };

  for (var k in css) {
    div.style[k] = css[k];
  }

  div = document.body.appendChild(div);
  var w = div.offsetWidth;
  document.body.removeChild(div);
  return w;
};

exports.calcTextWidth = calcTextWidth;