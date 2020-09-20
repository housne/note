---
title: Use webpack with angular
date: 2015-11-12T00:00:00+0800
tags:
  - javascript
  - webpack
  - angular
layout: post
---

[Webpack](https://webpack.github.io) is a module bundler for JavaScript， use commonjs or es6 to manage js module, and do some cool thing with it's loader and plugin, such as use the new feature of es6 with babel-loader, or transpile jsx code to js code with jsx-loader.<!--more-->

## Setup webpack

Just setup the babel-loader, transpile es6 code to es5 code use webpack.

```javascript
module.exports = {
  ...
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015',
        exclude: /(node_modules|lib)/
      }
    ]
  }
  ...
}
```

If you want include angular as a externals lib in your page, don't forget setup externals option in your `webpack.config.js`

```javascript
...
externals: {
  'angular': 'angular'
}
...
```

## use es6 class as controller

Finally class is the key word in es6, now you can class

```javascript
export default class HomeController {
  constructor() {
    this.name = "home";
  }

  getName() {
    return this.name;
  }
}

angular.module("app", []).controller("HomeController", HomeController);
```

## Asynchronous controller

```javascript
angular.module('app', []).config(function($locationProvider){
  $locationProvider
  .when('/', function(){
    templateUrl: require('file!../templates/index.html'),
    resolve: {
      load: function(){
          return new Promise(function(resolve, reject){
              require.ensure([], function(require){
                  require('../controllers/home.js');
                  resolve();
              });
          });
      },
    },
    controller: 'HomeController',
    controllerAs: 'vm'
  })
})
```
