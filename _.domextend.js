(function(window, undefined){
"use strict";
var win = window, doc = window.document;
var _ = win._;

//cache native slice
var nativeSlice = Array.prototype.slice;

//regular expression
var 
	rxIdSelector = /^#([\w\-]+)$/,
	rxClassSelector = /^\.([\w\-]+)$/,
	rxTagSelector = /^[\w\-]+$/,
	rxNameSelector = /^\[name=["']?([\w\-]+)["']?\]$/,
	rxReady = /^(complete|loaded|interactive)$/;

var arrayReady = ["complete", "loaded", "interactive"];

/**
 * get elements which were found with css selector
 * @param {String} selector
 * @param {HTMLElement} context
 */
_.qsa = function(selector, context) {
	var result, m;
	if(!context || !context.querySelector) {
		context = document;
	}
	if((m = rxIdSelector.exec(selector))) {
		result = [document.getElementById(m[1])];
	} else if((m = rxClassSelector.exec(selector))) {
		result = context.getElementsByClassName(m[1]);
	} else if((m = rxTagSelector.exec(selector))) {
		result = context.getElementsByTagName(m[1]);
	} else if((m = rxNameSelector.exec(selector))) {
		result = context.getElementsByName(m[1]);
	} else {
		result = context.querySelectorAll(selector);
	}
	return nativeSlice.call(result);
};

/**
 * get first element whick found with css selector
 * @param {String} selector
 * @param {HTMLElement} context
 */
_.qs = function(selector, context) {
	if(!context || !context.querySelector) {
		context = document;
	}
	return context.querySelector(selector);
};

/**
 * set "DOMContentLoaded" event handler
 * @param {Function} callback
 */
_.ready = function(callback) {
	var args = nativeSlice.call(arguments, 1);
	if (arrayReady.indexOf(doc.readyState) != -1) {
		if(!args) {
			callback.call(doc);
		} else {
			callback.apply(doc, args);
		}
	} else {
		var domContentLoadedCallback = function() {
			if(!args) {
				callback.call(doc);
			} else {
				callback.apply(doc, args);
			}
			doc.removeEventListener("DOMContentLoaded", domContentLoadedCallback);
		};
		doc.addEventListener("DOMContentLoaded", domContentLoadedCallback, false);
	}
};

/**
 * add event handler to elements
 * @param {Array|NodeList} targetElements
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 */
_.bind = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		element.addEventListener(type, callback, useCapture);
	});
};

/**
 * remove event handler from elements
 * @param {Array|NodeList} targetElements
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 */
_.unbind = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		element.removeEventListener(type, callback, useCapture);
	});
};

/**
 * add event handler which will be called once to elements
 * @param {Array|NodeList} targetElements
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 */
_.once = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		var wrapOnce = function(e) {
			callback.call(element, e);
			element.removeEventListener(type, wrapOnce, useCapture);
		};
		element.addEventListener(type, wrapOnce, useCapture);
	});
};

/**
 * delegate
 * @param {Array|NodeList}
 * @param {String} type
 * @param {String} selector
 * @param {Function} callback
 */
_.delegate = function(targetElements, type, selector, callback) {
	var closure = null;
	var storedClosure = null;
	_.forEach(targetElements, function(element) {
		if(_.isUndefined(element.closureList)) {
			element.closureList = {};
		}
		if(!_.has(element.closureList, type)) {
			element.closureList[type] = [];
		}
		closure = generateClosure(element, selector, callback);
		storedClosure = _.pluck(element.closureList[type], "closure");
		if(_.indexOf(storedClosure, closure) === -1) {
			element.closureList[type].push({
				selector: selector,
				callback: callback,
				closure: closure
			});
		}
		element.addEventListener(type, closure);
	});
};

/**
 * undelegate
 * @param {Array|NodeList}
 * @param {String} type
 * @param {String} selector
 * @param {Function} callback
 */
_.undelegate = function(targetElements, type, selector, callback) {
	var storedCallback;
	var storedSelector;
	var storedClosure;
	var index;
	_.forEach(targetElements, function(element) {
		if(!_.isUndefined(element.closureList) && _.has(element.closureList, type)) {
			if(type && selector && callback) {
				storedCallback = _.pluck(element.closureList[type], "callback");
				index = _.indexOf(storedCallback, callback);
				if(index !== -1) {
					element.removeEventListener(type, element.closureList[type][index].closure);
					element.closureList[type].splice(index, 1);
				}
			} else if(type && selector && !callback) {
				storedSelector = _.pluck(element.closureList[type], "selector");
				index = _.indexOf(storedSelector, selector);
				if(index !== -1) {
					element.removeEventListener(type, element.closureList[type][index].closure);
					element.closureList[type].splice(index, 1);
				}
			} else if(type && !selector && !callback) {
				_.forEach(element.closureList[type], function(item) {
					element.removeEventListener(type, item.closure);
				});
				delete element.closureList[type];
			} else {
				var keys = _.keys(element.closureList);
				_.forEach(keys, function(key) {
					_.forEach(element.closureList[key], function(item) {
						element.removeEventListener(key, item.closure);
					});
				});
				delete element.closureList;
			}
		}
	});
};

/**
 * add css class to elements
 * @param {Array|NodeList} targetElements
 * @param {String} className
 */
_.addClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		addClass(element, className);
	});
};

/**
 * remove css class from elements
 * @param {Array|NodeList} targetElements
 * @param {String} className
 */
_.removeClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		removeClass(element, className);
	});
};

/**
 * toggle css class of elemenets
 * @param {Array|NodeList} targetElements
 * @param {String} className
 */
_.toggleClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		toggleClass(element, className);
	});
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
		var children = _.qsa(selector, target);
		_.forEach(children, function(child) {
			if(e.target === child) {
				eventHandler.call(child, e);
			}
		});
	};
}

/**
 * add class to element
 * @param {HTMLElement} targetNode
 * @param {String} value
 */
function addClass(targetNode, value) {
	var classList = (value + "").split(" ");
	var newClass = "", oldClass = targetNode.className + "";
	var arrayBuffer = oldClass.split(" ");
	var valueIndex = -1;
	for(var i = 0, len = classList.length;i < len;i++) {
		valueIndex = arrayBuffer.indexOf(classList[i]);
		if(valueIndex === -1) {
			arrayBuffer.push(classList[i]);
		}
	}
	newClass = arrayBuffer.join(" ");
	if(newClass != oldClass) {
		//if className is updated
		targetNode.className = newClass;
	}
}

/**
 * remove class from element
 * @param {HTMLElement} targetNode
 * @param {String} value
 */
function removeClass(targetNode, value) {
	var classList = (value + "").split(" ");
	var newClass = "", oldClass = targetNode.className + "";
	var arrayBuffer = oldClass.split(" ");
	var valueIndex = -1;
	for(var i = 0, len = classList.length;i < len;i++) {
		valueIndex = arrayBuffer.indexOf(classList[i]);
		if(valueIndex !== -1) {
			arrayBuffer.splice(valueIndex, 1);
		}
	}
	newClass = arrayBuffer.join(" ");
	if(newClass != oldClass) {
		//if className is updated
		targetNode.className = newClass;
	}
}

/**
 * toggle class of element
 * @param {HTMLElement} targetNode
 * @param {String} value
 */
function toggleClass(targetNode, value) {
	var classList = (value + "").split(" ");
	var newClass = "", oldClass = targetNode.className + "";
	var arrayBuffer = oldClass.split(" ");
	var valueIndex = -1;
	for(var i = 0, len = classList.length;i < len;i++) {
		valueIndex = arrayBuffer.indexOf(classList[i]);
		if(valueIndex === -1) {
			//if does not exist
			arrayBuffer.push(value);
		} else {
			//if exist
			arrayBuffer.splice(valueIndex, 1);
		}
	}
	newClass = arrayBuffer.join(" ");
	if(newClass != oldClass) {
		//if className is updated
		targetNode.className = newClass;
	}
}

win._ = _;

})(window);