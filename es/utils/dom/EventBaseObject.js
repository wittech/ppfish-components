"use strict";

exports.__esModule = true;
exports.default = void 0;

function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,
  constructor: EventBaseObject,
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,
  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },
  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },
  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue; // fixed 1.2
    // call stopPropagation implicitly

    this.stopPropagation();
  },
  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }

    this.preventDefault();
  }
};
var _default = EventBaseObject;
exports.default = _default;