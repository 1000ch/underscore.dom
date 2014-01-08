# underscore.affix [![Build Status](https://travis-ci.org/1000ch/underscore.affix.png?branch=master)](https://travis-ci.org/1000ch/underscore.affix)

## About

This is plugin which provides API for DOM operation for underscore.js/lo-dash.js.

## Build

You can build with following command.

```sh
$ grunt build
```

This supports build for following libraries which provide Ajax or Promise.

+ [ded/reqwest](https://github.com/ded/reqwest)
+ [cujojs/when](https://github.com/cujojs/when)

```sh
$ git submodule init
$ git submodule update
$ grunt build
```

They will be mapped to `_.ajax` and `_.when`.

## Selector API

### _.qsa(selector, context)

Get all elements selected with css selector.

```js
//context is optional parameter.
//if context is empty, element will be searched with document as context
var elements = _.qsa("tagName .className", document);
```

### _.qs(selector, context)

Get first element selected with css selector.

```js
//context is optional parameter.
//if context is empty, element will be searched with document as context
var element = _.qs("tagName .className", document);
```

## Event API

### _.ready(callback)

Handle `DOMContentLoaded` event.

```js
_.ready(function() {
    console.log("DOMContentLoaded");
});
```

### _.on(targetElements, type, callback)

Add event to element.

```js
var clickCallback = function() {
    console.log("element is clicked.");
};

var targetElements = _.qsa(".targetClass");

_.on(targetElements, "click", clickCallback);
```

### _.off(targetElements, type, callback)

Remove event from element. 

```js
var clickCallback = function() {
    console.log("element is clicked.");
};

var targetElements = _.qsa(".targetClass");

_.off(targetElements, "click", clickCallback);
```

### _.on(targetElements, type, selector, callback)

Attach delegated event handler to elements which matches css selector.

```js
var clickCallback = function() {
    console.log("span is clicked.");
};

var targetElements = _.qsa(".targetClass");

_.on(targetElements, "click", "button", clickCallback);
```

### _.off(targetElements, type, selector, callback)

Detach delegated event handler from elements.

```js
var clickCallback = function() {
    console.log("span is clicked.");
};

var targetElements = _.qsa("targetTag");

_.off(targetElements, "click", "button", clickCallback);
```

## Manipulation API

### _.addClass(targetElements, className)

Add class to element. 

```js
var targetElemenets = _.qsa(".targetClass");

_.addClass(targetElemenets, "addClassName");
```

### _.removeClass(targetElements, className)

Remove class from element. 

```js
var targetElemenets = _.qsa(".targetClass");

_.removeClass(targetElemenets, "removeClassName");
```

### _.toggleClass(targetElements, className)

Toggle class of element.

```js
var targetElemenets = _.qsa(".targetClass");

_.toggleClass(targetElemenets, "toggleClassName");
```

## License

Copyright [1000ch.net](http://1000ch.net/)  
Released under the MIT license.  
