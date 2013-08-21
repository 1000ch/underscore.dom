(function(window, document, undefined){
    "use strict";
    var win = window, doc = document;
    var _local = win._;

    var nativeSlice = Array.prototype.slice;
    var rxIdSelector = /^#([\w\-]+)$/,
        rxClassSelector = /^\.([\w\-]+)$/,
        rxTagSelector = /^[\w\-]+$/,
        rxNameSelector = /^\[name=["']?([\w\-]+)["']?\]$/;

    var arrayReady = ["complete", "loaded", "interactive"];

    /**
     * get elements which were found with css selector
     * @param {String} selector
     * @param {HTMLElement} context
     * @return {Array}
     */
    _local.qsa = function(selector, context) {
        var result, m;
        if(!context || !context.querySelector) {
            context = document;
        }
        if((m = rxIdSelector.exec(selector))) {
            var buffer = document.getElementById(m[1]);
            if(buffer) {
                result = [buffer];
            } else {
                result = [];
            }
        } else if((m = rxClassSelector.exec(selector))) {
            result = context.getElementsByClassName(m[1]);
        } else if((m = rxTagSelector.exec(selector))) {
            result = context.getElementsByTagName(m[0]);
        } else if((m = rxNameSelector.exec(selector))) {
            result = context.getElementsByName(m[1]);
        } else {
            result = context.querySelectorAll(selector);
        }
        return nativeSlice.call(result);
    };

    /**
     * get first element whick found with css selector
     * @description return value is nullable.
     * @param {String} selector
     * @param {HTMLElement} context
     */
    _local.qs = function(selector, context) {
        if(!context || !context.querySelector) {
            context = document;
        }
        var m;
        if((m = rxIdSelector.exec(selector))) {
            return document.getElementById(m[1]);
        } else {
            return context.querySelector(selector);
        }
    };

    /**
     * set "DOMContentLoaded" event handler
     * @param {Function} callback
     */
    _local.ready = function(callback) {
        var args = nativeSlice.call(arguments, 1);
        if (arrayReady.indexOf(doc.readyState) !== -1) {
            if(!args) {
                callback.call(doc);
            } else {
                callback.apply(doc, args);
            }
        } else {
            var DOMContentLoadedCallback = function() {
                if(!args) {
                    callback.call(doc);
                } else {
                    callback.apply(doc, args);
                }
                doc.removeEventListener("DOMContentLoaded", DOMContentLoadedCallback);
            };
            doc.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
        }
    };

    /**
     * add event handler to elements
     * @param {Array|NodeList} targetElements
     * @param {String} type
     * @param {Function} callback
     * @param {Boolean} useCapture
     */
    _local.bind = function(targetElements, type, callback, useCapture) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            targetElements.addEventListener(type, callback, useCapture);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                element.addEventListener(type, callback, useCapture);
            });
        }
    };

    /**
     * remove event handler from elements
     * @param {Array|NodeList} targetElements
     * @param {String} type
     * @param {Function} callback
     * @param {Boolean} useCapture
     */
    _local.unbind = function(targetElements, type, callback, useCapture) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            targetElements.removeEventListener(type, callback, useCapture);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                element.removeEventListener(type, callback, useCapture);
            });
        }
    };

    /**
     * add event handler which will be called once to elements
     * @param {Array|NodeList} targetElements
     * @param {String} type
     * @param {Function} callback
     * @param {Boolean} useCapture
     */
    _local.once = function(targetElements, type, callback, useCapture) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            var wrapOnce = function(e) {
                callback.call(targetElements, e);
                targetElements.removeEventListener(type, wrapOnce, useCapture);
            };
            targetElements.addEventListener(type, wrapOnce, useCapture);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                var wrapOnce = function(e) {
                    callback.call(element, e);
                    element.removeEventListener(type, wrapOnce, useCapture);
                };
                element.addEventListener(type, wrapOnce, useCapture);
            });
        }
    };

    /**
     * delegate
     * @param {Array|NodeList}
     * @param {String} type
     * @param {String} selector
     * @param {Function} callback
     */
    _local.delegate = function(targetElements, type, selector, callback) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            delegate(targetElements, type, selector, callback);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                delegate(element, type, selector, callback);
            });
        }
    };

    /**
     * undelegate
     * @param {Array|NodeList}
     * @param {String} type
     * @param {String} selector
     * @param {Function} callback
     */
    _local.undelegate = function(targetElements, type, selector, callback) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            undelegate(targetElements, type, selector, callback);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                undelegate(element, type, selector, callback);
            });
        }
    };

    /**
     * add css class to elements
     * @param {Array|NodeList} targetElements
     * @param {String} className
     */
    _local.addClass = function(targetElements, className) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            addClass(targetElements, className);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                addClass(element, className);
            });
        }
    };

    /**
     * remove css class from elements
     * @param {Array|NodeList} targetElements
     * @param {String} className
     */
    _local.removeClass = function(targetElements, className) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            removeClass(targetElements, className);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                removeClass(element, className);
            });
        }
    };

    /**
     * toggle css class of elemenets
     * @param {Array|NodeList} targetElements
     * @param {String} className
     */
    _local.toggleClass = function(targetElements, className) {
        if(targetElements == null) {
            return;
        }
        if(_local.isElement(targetElements)) {
            toggleClass(targetElements, className);
        } else if(_local.isArray(targetElements)) {
            _local.forEach(targetElements, function(element) {
                toggleClass(element, className);
            });
        }
    };

    /**
     * create closure for event delegation
     * @param {HTMLElement} target
     * @param {String} selector
     * @param {Function} eventHandler
     * @return {Function}
     */
    function generateClosure(target, selector, eventHandler) {
        return function(e) {
            var callback = eventHandler;
            var children = _local.qsa(selector, target);
            _local.forEach(children, function(child) {
                if(e.target === child) {
                    eventHandler.call(child, e);
                }
            });
        };
    }

    /**
     * delegate
     * @param {HTMLElement} element
     * @param {String} type
     * @param {String} selector
     * @param {Function} callback
     */
    function delegate(element, type, selector, callback) {
        if(_local.isUndefined(element.eventStore)) {
            element.eventStore = {};
        }
        if(!_local.has(element.eventStore, type)) {
            element.eventStore[type] = [];
        }
        var closure = generateClosure(element, selector, callback);
        var storedClosure = _local.pluck(element.eventStore[type], "closure");
        if(_local.indexOf(storedClosure, closure) === -1) {
            element.eventStore[type].push({
                selector: selector,
                callback: callback,
                closure: closure
            });
        }
        element.addEventListener(type, closure);
    }

    /**
     * undelegate
     * @param {HTMLElement} element
     * @param {String} type
     * @param {String} selector
     * @param {Function} callback
     */
    function undelegate(element, type, selector, callback) {
        var storedCallback;
        var storedSelector;
        var index;
        if(!_local.isUndefined(element.eventStore)) {
            if(type && selector && callback) {
                storedCallback = _local.pluck(element.eventStore[type], "callback");
                index = _local.indexOf(storedCallback, callback);
                if(index !== -1) {
                    element.removeEventListener(type, element.eventStore[type][index].closure);
                    element.eventStore[type].splice(index, 1);
                }
            } else if(type && selector && !callback) {
                storedSelector = _local.pluck(element.eventStore[type], "selector");
                index = _local.indexOf(storedSelector, selector);
                if(index !== -1) {
                    element.removeEventListener(type, element.eventStore[type][index].closure);
                    element.eventStore[type].splice(index, 1);
                }
            } else if(type && !selector && !callback) {
                _local.forEach(element.eventStore[type], function(item) {
                    element.removeEventListener(type, item.closure);
                });
                delete element.eventStore[type];
            } else {
                var keys = Object.keys(element.eventStore);
                _local.forEach(keys, function(key) {
                    _local.forEach(element.eventStore[key], function(item) {
                        element.removeEventListener(key, item.closure);
                    });
                });
                delete element.eventStore;
            }
        }
    }

    /**
     * add class to element
     * @param {HTMLElement} targetNode
     * @param {String} value
     */
    function addClass(targetNode, value) {
        var classList = (value + "").split(" ");
        var oldClass = targetNode.className + "";
        var arrayBuffer = oldClass.split(" ");
        var valueIndex = -1;
        for(var i = 0, len = classList.length;i < len;i++) {
            valueIndex = arrayBuffer.indexOf(classList[i]);
            if(valueIndex === -1) {
                arrayBuffer.push(classList[i]);
            }
        }
        var newClass = arrayBuffer.join(" ");
        if(newClass != oldClass) {
            //if className is updated
            targetNode.className = newClass;
        }
    }

    /**
     * remove class from element
     * @param {HTMLElement} element
     * @param {String} value
     */
    function removeClass(element, value) {
        var classList = (value + "").split(" ");
        var oldClass = element.className + "";
        var arrayBuffer = oldClass.split(" ");
        var valueIndex = -1;
        for(var i = 0, len = classList.length;i < len;i++) {
            valueIndex = arrayBuffer.indexOf(classList[i]);
            if(valueIndex !== -1) {
                arrayBuffer.splice(valueIndex, 1);
            }
        }
        var newClass = arrayBuffer.join(" ");
        if(newClass != oldClass) {
            //if className is updated
            element.className = newClass;
        }
    }

    /**
     * toggle class of element
     * @param {HTMLElement} element
     * @param {String} value
     */
    function toggleClass(element, value) {
        var classList = (value + "").split(" ");
        var oldClass = element.className + "";
        var arrayBuffer = oldClass.split(" ");
        var valueIndex = -1;
        for(var i = 0, len = classList.length;i < len;i++) {
            valueIndex = arrayBuffer.indexOf(classList[i]);
            if(valueIndex === -1) {
                //if does not exist
                arrayBuffer.push(classList[i]);
            } else {
                //if exist
                arrayBuffer.splice(valueIndex, 1);
            }
        }
        var newClass = arrayBuffer.join(" ");
        if(newClass != oldClass) {
            //if className is updated
            element.className = newClass;
        }
    }

    win._ = _local;

})(window, document);
