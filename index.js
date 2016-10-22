var uniqid = require('uniq-id');
var events = require('events');
var EventEmitter = events.EventEmitter;

var Queue = function (options) {
    options = options || {};
    this.delay = options.delay || 200;
    this.max = options.max || null;
    this.stopOnEmpty = options.stopOnEmpty || false;
    this.elements = [];
};

Queue.prototype = EventEmitter.prototype;

Queue.prototype.push = function (func, args, context) {
    if (this.max && this.elements.length >= this.max) {
        this.emit('overflow');
        return false;
    }

    var key = uniqid();
    this.elements.push({
        el: func,
        args: args || [],
        context: context || this,
        key: key
    });
    return key;
};

Queue.prototype.start = function () {
    var self = this;
    this.interval = setInterval(function () {
        var element = self._getNext();
        if (element) {
            self._execute(element);
        } else if (self.stopOnEmpty) {
            self.stop();
        }
    }, this.delay);
    this.emit('start');
};

Queue.prototype._getNext = function () {
    if (!this.elements.length) {
        return false;
    }
    return this.elements.shift();
};

Queue.prototype._execute = function (element) {
    if (typeof element.el === 'function') {
        element.el.apply(element.context, element.args);
        this.emit('execute', element.key);
    }
};

Queue.prototype.stop = function (wipe) {
    clearInterval(this.interval);
    if (!!wipe) {
        delete this.elements;
        this.elements = {};
    }
    this.emit('stop');
};

Queue.prototype.isRunning = function () {
    return !!this.interval;
};

module.exports = Queue;