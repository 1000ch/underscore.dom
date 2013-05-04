(function(window, undefined){
"use strict";
var win = window,
	doc = window.document,
	_ = win._;

//regular expression
var rxConciseSelector = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,//filter #id, tagName, .className
	rxIdSelector = /^#([\w\-]+)$/,
	rxClassSelector = /^\.([\w\-]+)$/,
	rxTagSelector = /^[\w\-]+$/,
	rxNameSelector = /^\[name=["']?([\w\-]+)["']?\]$/,
	rxReady = /complete|loaded|interactive/;

_.qsa = function(selector, context) {
	var result, m;
	if(!context || !context.querySelector) {
		context = document;
	}
	if(m = rxIdSelector.exec(selector)) {
		result = [document.getElementById(m[1])];
	} else if(m = rxClassSelector.exec(selector)) {
		result = context.getElementsByClassName(m[1]);
	} else if(m = rxTagSelector.exec(selector)) {
		result = context.getElementsByTagName(m[1]);
	} else if(m = rxNameSelector.exec(selector)) {
		result = context.getElementsByName(m[1]);
	} else {
		result = context.querySelectorAll(selector);
	}
	return nativeSlice.call(result);
};

_.qs = function(selector, context) {
	if(!context || !context.querySelector) {
		context = document;
	}
	return nativeSlice.call(context.querySelector(selector));
};

_.ready = function(callback) {
	var args = arraySlice.call(arguments, 1);
	if (rxReady.test(doc.readyState)) {
		if(!args) {
			callback.call(doc);
		} else {
			callback.apply(doc, args);
		}
	} else {
		doc.addEventListener("DOMContentLoaded", function() {
			if(!args) {
				callback.call(doc);
			} else {
				callback.apply(doc, args);
			}
		}, false);
	}
};

_.bind = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		element.addEventListener(type, callback, useCapture);
	});
};

_.unbind = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		element.removeEventListener(type, callback, useCapture);
	});
};

_.once = function(targetElements, type, callback, useCapture) {
	_.forEach(targetElements, function(element) {
		var wrapOnce = function(e) {
			callback.call(element, e);
			element.removeEventListener(type, wrapOnce, useCapture);
		};
		element.addEventListener(type, wrapOnce, useCapture);
	});
};

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
				_.each(element.closureList[type], function(item) {
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

_.addClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		addClass(element, className);
	});
};

_.removeClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		removeClass(element, className);
	});
};

_.toggleClass = function(targetElements, className) {
	_.forEach(targetElements, function(element) {
		toggleClass(element, className);
	});
};


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

})(window);