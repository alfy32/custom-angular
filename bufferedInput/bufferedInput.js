/* global app */

app.directive('bufferedinput', function ($parse) {
  return {
    restrict: 'E',
    replace: true,
    template: '<input>',
    link : function (scope, element, attr) {
      var buffer = attr['bufferName'];
      var obj = attr['object'];
      var prop = attr['property'];

      // initializes the buffer-name to be the property of the object.
      scope[buffer] = prop;

      element.bind('blur', function (event) {
        // changes <buffer-name> to the original property.
        scope.$apply(buffer+' = "' + prop + '"');
      });
      element.bind('focus', function (event) {
        // updates the buffer with the current property value.
        scope.$apply(obj+'["'+buffer+'"] = '+obj+'["'+prop+'"]');
        // changes <buffer-name> to the buffer property.
        scope.$apply(buffer+' = "' + prop + 'buffer"');
      });
      element.bind('keyup', function (event) {
        // changes the original property as the buffer changes.
        scope.$apply(obj+'["'+prop+'"] = '+obj+'["'+buffer+'"]');
      });
    }
  }
});

/* Expected Use - It will probably break if not used this way.

<bufferedInput
  ng-model="<object-name>[<buffer-name>]"
  buffer-name="<buffer-name>"
  object="<object-name>"
  property="<property-name>">

<object-name> is an object in the scope
<buffer-name> is a scope variable
  - make the name unique so it isn't used somewhere else
<property-name> is the property on the object defined by <object-name>

*/
