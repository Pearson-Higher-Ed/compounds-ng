import * as angular from 'angular';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Compounds from 'pearson-compounds';

const mod = angular.module('compounds-ng', []);

let compMap = {};
Object.keys(Compounds).forEach(function(comp){
  compMap[comp.toLowerCase()] = Compounds[comp];
});

function arrayify(arrayLike){
  return Array.prototype.slice.call(arrayLike, 0);
}

function nodeAttributestoProps(node){
  if(node[0]){
    node = node[0];
  }
  var props = {};
  angular.forEach(node.attributes, function(a) {
    props[a.name.replace('class', 'className')] = a.value;
  });

  return props;
}

function createEls(contents, root){
  if(contents.length == 0){
    return;
  }
  else if(root && contents.length != 1){
    throw 'Connot initialize, compounds must have a single internal root element';
    return;
  }
  else{
    var ret = [];
    contents.forEach(function(node){
      var nn = node.nodeName.toLowerCase(),
        comp = nodeNameToComp(nn),
        props = nodeAttributestoProps(node);
      if(nn == '#text'){
        comp = 'span';
        props.dangerouslySetInnerHTML = {__html: node.textContent};
      }
      var compArgs = [comp, props];
      if(node.childNodes && node.childNodes.length > 0){
        var children = arrayify(node.childNodes);
        Array.prototype.push.apply(compArgs, createEls(children));
      }
      ret.push(React.createElement.apply(null, compArgs));
    });
    if(root){
      return ret[0];
    }
    else{
      return ret;
    }
  }
}

function nodeNameToComp(nn){
  return compMap[nn] || nn;
}

mod.factory('Reactor', [function(){

  return {
    render: function(el){
      var contents =arrayify(el.children());
      if(contents.length == 1 && contents[0].attributes['data-reactid']){
        // double pass, stupid angular
        return;
      }
      var shimComp = createEls(contents, true);
      ReactDOM.render(shimComp, el[0]);

    },
    unmount: function(el){
      ReactDOM.unmountComponentAtNode(el[0]);
    }
  }
}]);

mod.directive('compound', ['Reactor', function(Reactor){
  return {
    restrict: 'E',
    priority: 1000000,
    //transclude: true,
    scope: {},
    //template: '<span ng-transclude></span>',
    link: function(scope, el, attr){

      Reactor.render(el);

      scope.$watch('ngModel', function() {
        Reactor.render(el);
      }, true);

      scope.$on('$destroy', function () {
        Reactor.unmount(el);
      });
    }
  }
}]);
