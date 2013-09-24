# underscore.affix [![Build Status](https://travis-ci.org/1000ch/underscore.affix.png?branch=master)](https://travis-ci.org/1000ch/underscore.affix)

## About

`_`のdom系のAPI拡張。  
`_`に入れないほうがいいような気もしたけど、  
`_`に依存しているし、`$`を使うわけにもいかないので。  

## Build

以下のコマンドでbuild出来ます。

```sh
grunt build
```

AjaxとかDeferredも使いたい場合もあるかなということで  
以下を含んだビルドもサポートしています。  

+ [ded/reqwest](https://github.com/ded/reqwest)
+ [cujojs/when](https://github.com/cujojs/when)

```sh
git submodule init
git submodule update
grunt build
```

それぞれ、`_.ajax`と`_.when`にマッピングしてあるので、  
リポジトリのドキュメント見ながら使ってください。  

## Selector API

### _.qsa(selector, context)

指定のCSSセレクタに該当する要素をすべて取得します。  

    //context is optional parameter.
    //if context is empty, element will be searched with document as context
    var elements = _.qsa("tagName .className", document);

### _.qs(selector, context)

指定のCSSセレクタに該当する要素のうち、先頭の要素を取得します。  

    //context is optional parameter.
    //if context is empty, element will be searched with document as context
    var element = _.qs("tagName .className", document);

## Event API

### _.ready(callback)

DOMツリーが構築された時に発火するイベントを指定します。  

    _.ready(function() {
        console.log("DOMContentLoaded");
    });

### _.on(targetElements, type, callback)

指定の要素にイベントをバインドします。  

    var clickCallback = function() {
        console.log("element is clicked.");
    };
    
    var targetElements = _.qsa(".targetClass");
    
    _.on(targetElements, "click", clickCallback);

### _.off(targetElements, type, callback)

指定の要素からイベントをアンバインドします。  

    var clickCallback = function() {
        console.log("element is clicked.");
    };
    
    var targetElements = _.qsa(".targetClass");
    
    _.off(targetElements, "click", clickCallback);

### _.on(targetElements, type, selector, callback)

指定の要素にイベントを移譲し、指定のCSSセレクタに該当する子要素が  
ある場合イベントを発火します。  

    var clickCallback = function() {
        console.log("span is clicked.");
    };
    
    var targetElements = _.qsa(".targetClass");
    
    _.on(targetElements, "click", "button", clickCallback);

### _.off(targetElements, type, selector, callback)

指定の要素にイベントを移譲されている場合、それを除きます。

    var clickCallback = function() {
        console.log("span is clicked.");
    };
    
    var targetElements = _.qsa("targetTag");
    
    _.off(targetElements, "click", "button", clickCallback);

## Manipulation API

### _.addClass(targetElements, className)

指定の要素にクラスを追加します。  

    var targetElemenets = _.qsa(".targetClass");

    _.addClass(targetElemenets, "addClassName");

### _.removeClass(targetElements, className)

指定の要素からクラスを削除します。  

    var targetElemenets = _.qsa(".targetClass");
    
    _.removeClass(targetElemenets, "removeClassName");

### _.toggleClass(targetElements, className)

指定の要素のクラスをトグルします。  

    var targetElemenets = _.qsa(".targetClass");
    
    _.toggleClass(targetElemenets, "toggleClassName");

##License

Copyright [1000ch.net](http://1000ch.net/)  
Released under the MIT license.  
