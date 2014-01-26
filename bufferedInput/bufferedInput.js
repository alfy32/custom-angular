/* global app */

app.directive('bufferedinput', function ($parse) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      obj: '=object'
    },
    template: '<input type="text" ng-model="obj[prop]">',
    link : function (scope, element, attr) {
      var prop = scope.$parent[attr['property']] || attr['property'];
      var buffer = prop + 'buffer';

      scope.prop = prop;

      element.bind('blur', function (event) {
        // changes <buffer-name> to the original property.
        scope.$apply('prop = "' + prop + '"');
      });

      element.bind('focus', function (event) {
        // updates the buffer with the current property value.
        scope.$apply('obj["'+buffer+'"] = obj["'+prop+'"]');
        // changes <buffer-name> to the buffer property.
        scope.$apply('prop = "' + buffer + '"');
      });

      element.bind('keyup', function (event) {
        // changes the original property as the buffer changes.
        scope.$apply('obj["'+prop+'"] = obj["'+buffer+'"]');
      });
    }
  }
});


/* Expected Use - It will probably break if not used this way.

<bufferedInput
  object="<object-name>"
  property="<property-name>">

<object-name> is an object in the scope
<property-name> is the property on the object defined by <object-name>

*/
