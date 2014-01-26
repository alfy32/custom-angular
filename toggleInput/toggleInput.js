/* global app */

app.directive('toggleinput', function ($parse) {
  return {
    replace: true,
    restrict: 'E',
    transclude: true,
    scope: {},
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs) {
      var span = element.find('span');
      var input = element.find('input');

      $(input[0]).hide();

      span.bind('click', function (event) {
        $(span[0]).hide();
        $(input[0]).show();
        input[0].focus();
      });

      input.bind('blur', function () {
        $(span[0]).show();
        $(input[0]).hide();
      });

      input.bind('keydown', function (event) {
        if(event.which == 13) input.blur();
      });
    }
  };
});

// Expected Use - It is not garunteed to work otherwise.
//
//   Simply put a span and an input in the toggleInput
//   and the input is hidden to start then when the span
//   is clicked the span is hidden and the input is shown.
//   When the input blurs it is hidden and the span is shown.
//
// <toggleInput>
//   <span></span>
//   <input>
// </toggleInput>
